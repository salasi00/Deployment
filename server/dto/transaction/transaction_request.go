package transactiondto

import (
	"housy/models"
	"time"
)

type CreateTransactionRequest struct {
	ID        int          `json:"id" gorm:"type: int"`
	HouseID   int          `json:"houseid" form:"houseid" validate:"required"`
	House     models.House `json:"house"`
	UserID    int          `json:"userid" form:"userid" validate:"required"`
	User      models.User  `json:"user"`
	CheckIn   time.Time    `json:"check_in"`
	CheckOut  time.Time    `json:"check_out"`
	Total     string       `json:"total" form:"total" validate:"required"`
	Status    string       `json:"status" form:"status" validate:"required"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
}

type UpdateTransactionRequest struct {
	Status string `json:"status" form:"status"`
}
