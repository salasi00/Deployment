package usersdto

import (
	"housy/models"
	"time"
)

type CreateUserRequest struct {
	Fullname  string      `json:"fullname" form:"fullname" validate:"required"`
	Username  string      `json:"username" form:"username" validate:"required"`
	Email     string      `json:"email" form:"email" validate:"required"`
	Password  string      `json:"password" form:"password" validate:"required"`
	RoleID    int         `json:"roleid" form:"roleid" validate:"required"`
	Role      models.Role `json:"role"`
	Gender    string      `json:"gender" form:"gender" validate:"required"`
	Phone     string      `json:"phone" form:"gender" validate:"required"`
	Address   string      `json:"address" form:"address" validate:"required"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
}

type UpdateUserRequest struct {
	// Fullname  string    `json:"fullname" form:"fullname"`
	// Username  string    `json:"username" form:"username"`
	// Email     string    `json:"email" form:"email"`
	// Password  string    `json:"password" form:"password"`
	// RoleID    int       `json:"roleid" form:"listasid"`
	// Gender    string    `json:"gender" form:"gender"`
	// Phone     string    `json:"phone" form:"phone"`
	// Address   string    `json:"address" form:"address"`
	Image string `json:"image" form:"image"`
	// CreatedAt time.Time `json:"created_at"`
	// UpdatedAt time.Time `json:"updated_at"`
}
