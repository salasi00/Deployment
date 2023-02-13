package usersdto

import (
	"housy/models"
	"time"
)

type UserResponse struct {
	ID        int         `json:"id"`
	Fullname  string      `json:"fullname" form:"fullname"`
	Username  string      `json:"username" form:"username"`
	Email     string      `json:"email" form:"email"`
	Password  string      `json:"password" form:"password"`
	RoleID    int         `json:"roleid"`
	Role      models.Role `json:"role"`
	Gender    string      `json:"gender" form:"gender"`
	Phone     string      `json:"phone" form:"phone"`
	Address   string      `json:"address" form:"address"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
}
