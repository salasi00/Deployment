package models

import "time"

type Transaction struct {
	ID        int       `json:"id" gorm:"primary_key:auto_increment"`
	HouseID   int       `json:"houseid"`
	House     House     `json:"house"`
	UserID    int       `json:"userid"`
	User      User      `json:"user"`
	CheckIn   time.Time `json:"checkin"`
	CheckOut  time.Time `json:"checkout"`
	Total     string    `json:"total" form:"total" gorm:"type: varchar(255)"`
	Status    string    `json:"status" form:"status" gorm:"type: varchar(255)"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (Transaction) TableName() string {
	return "transactions"
}
