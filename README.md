 # 🎯 Mini Target Tracker

A real-time dashboard that receives and displays "target" objects, simulating a tracking system. Built with Angular frontend and FastAPI backend.

## Features

### Frontend (Angular)
- ✅ Real-time target display with WebSocket connection
- ✅ Target information: id, name, heading, timestamp, classification
- ✅ Visual highlighting of the most recent target
- ✅ Filter targets by classification (hostile/friendly)
- ✅ Rotating heading icon based on target direction
- ✅ Responsive design for mobile and desktop
- ✅ Connection status indicator
- ✅ Start/Stop stream controls

### Backend (FastAPI)
- ✅ POST /targets - Accepts JSON array of targets
- ✅ GET /targets - Returns all stored targets
- ✅ WebSocket endpoint - Emits random targets every second
- ✅ CORS enabled for frontend communication
- ✅ In-memory target storage

## Project Structure

```
frontend/src/app/
├── app.component.ts
├── app.component.html
├── app.component.css
├── components/
│   ├── dashboard-header/
│   │   ├── dashboard-header.component.ts
│   │   ├── dashboard-header.component.html
│   │   └── dashboard-header.component.css
│   ├── stream-controls/
│   │   ├── stream-controls.component.ts
│   │   ├── stream-controls.component.html
│   │   └── stream-controls.component.css
│   └── target-list/
│       ├── target-list.component.ts
│       ├── target-list.component.html
│       └── target-list.component.css
├── models/
│   └── target.model.ts
└── services/
    └── target.service.ts
```

## How to Run

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

   The backend will be available at:
   - API: http://localhost:8000
   - WebSocket: ws://localhost:8000/ws
   - API Documentation: http://localhost:8000/docs

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   npm start
   ```

   The frontend will be available at: http://localhost:4200

## API Endpoints

### REST API
- `GET /` - Health check
- `GET /targets` - Get all stored targets
- `POST /targets` - Add new targets (expects `{"targets": [...]}`)

### WebSocket
- `ws://localhost:8000/ws` - Real-time target stream

## Target Data Structure

```typescript
interface Target {
  id: string;
  name: string;
  heading: number; // degrees (0-360)
  timestamp: string; // ISO date string
  classification: 'hostile' | 'friendly';
}
```

## Usage

1. Start both backend and frontend servers
2. Open http://localhost:4200 in your browser
3. Click "Start Stream" to begin receiving simulated targets
4. Use the filter dropdown to show only hostile or friendly targets
5. The most recent target will be highlighted in yellow
6. Hostile targets have red borders, friendly targets have green borders
7. The heading arrow rotates based on the target's direction

## Technical Decisions & Trade-offs

### Frontend
- **Angular 17 with Standalone Components**: Modern Angular approach for better tree-shaking and performance
- **RxJS for State Management**: Reactive programming pattern for real-time data handling
- **Simulated WebSocket**: Uses RxJS interval for demo purposes, easily switchable to real WebSocket
- **CSS-in-JS**: Component-scoped styles for better encapsulation
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

### Backend
- **FastAPI**: Modern, fast Python framework with automatic API documentation
- **Pydantic v1**: Avoids Rust compilation issues while maintaining type safety
- **In-memory Storage**: Simple implementation for demo, easily replaceable with database
- **WebSocket Support**: Real-time communication for live target updates
- **CORS Configuration**: Properly configured for frontend communication

### Performance Considerations
- **Target Limit**: Frontend keeps only last 50 targets to prevent memory issues
- **TrackBy Function**: Optimized Angular rendering with proper change detection
- **Connection Management**: Proper WebSocket connection handling with cleanup

## Development Time

- **Backend**: ~2 hours (FastAPI setup, models, endpoints, WebSocket)
- **Frontend**: ~3 hours (Angular setup, components, styling, real-time features)
- **Testing & Polish**: ~1 hour
- **Total**: ~6 hours

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Authentication and user management
- Target history and analytics
- Real-time alerts and notifications
- Map visualization with target positions
- Export functionality (CSV, JSON)
- Unit and integration tests
- Docker containerization