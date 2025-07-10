from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio
import random
from datetime import datetime
from typing import List
import uuid

from .models import Target, TargetCreate

app = FastAPI(title="Mini Target Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

targets: List[Target] = []

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                self.active_connections.remove(connection)

manager = ConnectionManager()

@app.get("/")
async def root():
    return {"message": "Mini Target Tracker API"}

@app.post("/targets")
async def create_targets(target_data: TargetCreate):
    """Accept a JSON array of targets and store them in memory"""
    global targets
    targets.extend(target_data.targets)
    return {"message": f"Added {len(target_data.targets)} targets", "total_targets": len(targets)}

@app.get("/targets")
async def get_targets():
    """Return the full list of stored targets"""
    return {"targets": targets, "count": len(targets)}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint that emits random targets every second"""
    await manager.connect(websocket)
    try:
        while True:
            target = Target(
                id=str(uuid.uuid4()),
                name=f"Target-{random.randint(1000, 9999)}",
                heading=random.uniform(0, 360),
                timestamp=datetime.now(),
                classification=random.choice(["hostile", "friendly"])
            )
            
            await manager.send_personal_message(
                json.dumps(target.dict(), default=str), 
                websocket
            )
            
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 