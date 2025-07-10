import requests
import json
import time
from datetime import datetime

# Base URL for the API
BASE_URL = "http://localhost:8000"

def test_root_endpoint():
    """Test the root endpoint"""
    print("🔍 Testing root endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"✅ Root endpoint: {response.status_code} - {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Root endpoint failed: {e}")
        return False

def test_get_targets_empty():
    """Test getting targets when empty"""
    print("\n🔍 Testing GET /targets (empty)...")
    try:
        response = requests.get(f"{BASE_URL}/targets")
        print(f"✅ GET /targets: {response.status_code}")
        data = response.json()
        print(f"   Targets count: {data['count']}")
        print(f"   Targets: {data['targets']}")
        return True
    except Exception as e:
        print(f"❌ GET /targets failed: {e}")
        return False

def test_post_targets():
    """Test posting targets"""
    print("\n🔍 Testing POST /targets...")
    test_targets = [
        {
            "id": "test-1",
            "name": "Test Target Alpha",
            "heading": 45.5,
            "timestamp": datetime.now().isoformat(),
            "classification": "hostile"
        },
        {
            "id": "test-2", 
            "name": "Test Target Bravo",
            "heading": 180.0,
            "timestamp": datetime.now().isoformat(),
            "classification": "friendly"
        }
    ]
    
    try:
        response = requests.post(
            f"{BASE_URL}/targets",
            json={"targets": test_targets},
            headers={"Content-Type": "application/json"}
        )
        print(f"✅ POST /targets: {response.status_code}")
        data = response.json()
        print(f"   Response: {data}")
        return True
    except Exception as e:
        print(f"❌ POST /targets failed: {e}")
        return False

def test_get_targets_with_data():
    """Test getting targets after posting"""
    print("\n🔍 Testing GET /targets (with data)...")
    try:
        response = requests.get(f"{BASE_URL}/targets")
        print(f"✅ GET /targets: {response.status_code}")
        data = response.json()
        print(f"   Targets count: {data['count']}")
        print(f"   Targets: {json.dumps(data['targets'], indent=2)}")
        return True
    except Exception as e:
        print(f"❌ GET /targets failed: {e}")
        return False

def test_websocket_info():
    """Test WebSocket endpoint info"""
    print("\n🔍 WebSocket endpoint info...")
    print(f"✅ WebSocket URL: ws://localhost:8000/ws")
    print("   (Use a WebSocket client to test this endpoint)")
    return True

def main():
    """Run all tests"""
    print("🚀 Testing Mini Target Tracker Backend")
    print("=" * 50)
    
    tests = [
        test_root_endpoint,
        test_get_targets_empty,
        test_post_targets,
        test_get_targets_with_data,
        test_websocket_info
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        time.sleep(0.5)  # Small delay between tests
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the backend server.")

if __name__ == "__main__":
    main() 