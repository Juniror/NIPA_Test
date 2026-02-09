# API Documentation

## API Endpoints

### Authentication

#### POST `/api/auth/login`

*   **Request Body**:
    ```json
    {
      "username": "example",
      "password": "password"
    }
    ```
*   **Response**:
    ```json
    {
      "success": true,
      "message": "Login successful",
      "user": {
        "id": 1,
        "username": "example",
        "mail": "example@gmail.com"
      }
    }
    ```

### Tickets

#### POST `/api/tickets`
เพิ่มรายการตั๋ว

*   **Request Body**:
    ```json
    {
      "name": "example",
      "email": "example@gmail.com",
      "subject": "Login Issue",
      "question": "I cannot login to my account.",
      "phone": "0827779998",
      "company": "company name",
      "memo": "message for memo",
      "signature": "example user"
    }
    ```
*   **Response**:
    ```json
    {
      "message": "Ticket created successfully",
      "ticketId": 1,
      "status": "pending"
    }
    ```

#### GET `/api/tickets`
ดึงรายการตั๋ว

*   **Query Parameters** (Optional):
    *   `status`: Filter by status (`pending`, `accepted`, `resolved`, `rejected`).
    *   `sort`: Sort options (`latest_update`, `created_at`, `status`, `none`).

*   **Example URL (Simple)**: `/api/tickets`
*   **Example URL (Filtered & Sorted)**: `/api/tickets?status=pending&sort=latest_update`
*   **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "example",
        "email": "example@gmail.com",
        "subject": "Login Issue",
        "status": "pending",
        "created_at": "2024-03-20T10:00:00.000Z",
        "updated_at": "2024-03-21T15:30:00.000Z"
      },
      ...
    ]
    ```

#### PUT `/api/tickets/:id`
อัปเดตรายละเอียดหรือสถานะของตั๋ว

*   **Request Body** (include any fields to update):
    ```json
    {
      "status": "accepted",
      "memo": "Investigating now.",
      "signature": "example user"
    }
    ```
*   **Response**:
    ```json
    {
      "message": "Ticket updated successfully"
    }
    ```

#### GET `/api/tickets/history`
ดึงประวัติของการกระทำทั้งหมด

*   **Response**:
    ```json
    [
        {
            "id": 1,
            "ticket_id": 1,
            "signature": "example user",
            "details": "Ticket updated successfully",
            "timestamp": "2022-01-01T00:00:00.000Z"
        },
        ...
    ]
    ```

