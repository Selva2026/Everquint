Data Model
Room
Booking
Idempotency

Overlap Prevention
Bookings checked using condition

existing.startTime < newEnd
AND
existing.endTime > newStart

Error Handling
All errors return JSON

{
 error,
 message
}

Idempotency
Unique index on
(idempotencyKey + organizerEmail)

This ensures duplicate requests do not create new bookings.

Concurrency
Handled by DB unique index.

Utilization
Formula:

totalBookedHours / businessHours

Business hours
Mon-Fri
08:00-20:00