# Meeting Room Booking Service

A REST API service to manage meeting rooms and bookings.

This project demonstrates:

* Clean API design
* Validation
* Idempotent booking creation
* Conflict prevention
* Room utilization reporting
* Proper error handling
* MVC architecture

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Jest (for testing)

---

# Project Structure

```
src
 ├── controllers
 │    roomController.js
 │    bookingController.js
 │    reportController.js
 │
 ├── services
 │    roomService.js
 │    bookingService.js
 │    reportService.js
 │
 ├── models
 │    roomModel.js
 │    bookingModel.js
 │    idempotencyModel.js
 │
 ├── routes
 │    roomRoutes.js
 │    bookingRoutes.js
 │    reportRoutes.js
 │
 ├── utils
 │
 ├── .env
 │
 └── app.js
```

Business logic is implemented in **services**, not controllers.

---
Example .env file:

PORT=5000
MONGO_URL=mongodb://localhost:27017/meeting-room-booking


# Data Model

## Room

```
{
  _id,
  name: String,
  capacity: Number,
  floor: Number,
  amenities: [String]
}
```

Example

```
{
 "name": "Conference Room A",
 "capacity": 10,
 "floor": 2,
 "amenities": ["projector","whiteboard"]
}
```

---

## Booking

```
{
 _id,
 roomId,
 title,
 organizerEmail,
 startTime,
 endTime,
 status
}
```

Example

```
{
 "roomId":"65f2b7d92f123456abcd1234",
 "title":"Sprint Planning",
 "organizerEmail":"pandi@company.com",
 "startTime":"2026-03-20T10:00:00.000Z",
 "endTime":"2026-03-20T11:00:00.000Z",
 "status":"confirmed"
}
```

---

## Idempotency

```
{
 idempotencyKey,
 organizerEmail,
 bookingId,
 response
}
```

Unique index

```
(idempotencyKey + organizerEmail)
```

This prevents duplicate bookings.

---

# API Endpoints

---

# 1 Create Room

POST /rooms

### Sample Request

```
POST /rooms
```

Body

```
{
 "name":"Conference Room A",
 "capacity":12,
 "floor":3,
 "amenities":["projector","tv","whiteboard"]
}
```

### Response

```
{
 "_id":"65f2b7d92f123456abcd1234",
 "name":"Conference Room A",
 "capacity":12,
 "floor":3,
 "amenities":["projector","tv","whiteboard"]
}
```

### Validation Rules

* name must be unique
* capacity >= 1

### Error Example

```
{
 "error":"ValidationError",
 "message":"Room name must be unique"
}
```

---

# 2 List Rooms

GET /rooms

Query parameters

* minCapacity
* amenity

### Example Request

```
GET /rooms?minCapacity=10&amenity=projector
```

### Response

```
[
 {
  "_id":"65f2b7d92f123456abcd1234",
  "name":"Conference Room A",
  "capacity":12,
  "floor":3,
  "amenities":["projector","tv"]
 }
]
```

---

# 3 Create Booking

POST /bookings

### Headers

```
Idempotency-Key: booking123
```

### Sample Request

```
{
 "roomId":"65f2b7d92f123456abcd1234",
 "title":"Team Standup",
 "organizerEmail":"pandi@company.com",
 "startTime":"2026-03-20T10:00:00.000Z",
 "endTime":"2026-03-20T11:00:00.000Z"
}
```

### Success Response

```
{
 "_id":"65f3c01a2f123456abcd5678",
 "roomId":"65f2b7d92f123456abcd1234",
 "title":"Team Standup",
 "organizerEmail":"pandi@company.com",
 "startTime":"2026-03-20T10:00:00.000Z",
 "endTime":"2026-03-20T11:00:00.000Z",
 "status":"confirmed"
}
```

---

# Booking Rules

* startTime < endTime
* Duration: 15 minutes – 4 hours
* Allowed only Mon-Fri
* Time: 08:00 – 20:00

---

# Overlap Prevention

Bookings checked using condition

```
existing.startTime < newEnd
AND
existing.endTime > newStart
```

If overlap occurs

```
409 Conflict
```

Response

```
{
 "error":"Conflict",
 "message":"Booking overlap detected"
}
```

---

# 4 List Bookings

GET /bookings

Query parameters

* roomId
* from
* to
* limit
* offset

### Example Request

```
GET /bookings?roomId=65f2b7d92f123456abcd1234&limit=10&offset=0
```

### Response

```
{
 "items":[
   {
     "title":"Team Standup",
     "startTime":"2026-03-20T10:00:00Z",
     "endTime":"2026-03-20T11:00:00Z"
   }
 ],
 "total":25,
 "limit":10,
 "offset":0
}
```

---

# 5 Idempotent Booking Creation

If request sent multiple times with same key

```
Idempotency-Key: booking123
```

Server returns same booking.

No duplicate booking created.

---

# 6 Cancel Booking

POST /bookings/{id}/cancel

### Example

```
POST /bookings/65f3c01a2f123456abcd5678/cancel
```

Rule

Cancellation allowed only **1 hour before startTime**

### Response

```
{
 "_id":"65f3c01a2f123456abcd5678",
 "status":"cancelled"
}
```

If too late

```
{
 "error":"ValidationError",
 "message":"Booking cannot be cancelled within 1 hour of start"
}
```

Cancelled bookings **do not block new bookings**.

---

# 7 Room Utilization Report

GET /reports/room-utilization

Query

* from
* to

### Example

```
GET /reports/room-utilization?from=2026-03-01&to=2026-03-31
```

### Response

```
[
 {
  "roomId":"65f2b7d92f123456abcd1234",
  "roomName":"Conference Room A",
  "totalBookingHours":12.5,
  "utilizationPercent":0.45
 }
]
```

---

# Utilization Formula

```
totalBookedHours / businessHours
```

Business hours

```
Mon-Fri
08:00 - 20:00
```

---

# Error Handling

All errors return JSON

```
{
 "error":"ValidationError",
 "message":"startTime must be before endTime"
}
```

HTTP Status Codes

```
400 Validation error
404 Room not found
409 Booking conflict
500 Server error
```

---

# Concurrency

Handled by database constraints.

Unique index

```
(idempotencyKey + organizerEmail)
```

Ensures concurrent requests do not create duplicate bookings.

---

# Running the Project

Install dependencies

```
npm install
```

Start server

```
npm run dev
```

---

# Running Tests

```
npm test
```

Tests include

* Booking duration validation
* Overlap prevention
* Idempotency behavior
* Cancellation rule
* Utilization report calculation

---

# Author

Pandi
