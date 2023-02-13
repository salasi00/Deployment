package models

import (
	"time"

	"gorm.io/datatypes"
)

type House struct {
	ID          int            `json:"id"`
	CityID      int            `json:"-"`
	City        City           `json:"city"`
	UserID      int            `json:"-"`
	User        User           `json:"user"`
	Name        string         `json:"name" form:"name" gorm:"type: varchar(255)"`
	Amenities   datatypes.JSON `json:"amenities" form:"amenities" gorm:"type: json"`
	Price       string         `json:"price" form:"price" gorm:"type: varchar(255)"`
	Rent        string         `json:"rent" form:"rent" gorm:"type: varchar(255)"`
	Bedroom     string         `json:"bedroom" form:"bedroom" gorm:"type: varchar(255)"`
	Bathroom    string         `json:"bathroom" form:"bathroom" gorm:"type: varchar(255)"`
	Sqf         string         `json:"sqf" form:"sqf" gorm:"type: varchar(255)"`
	Description string         `json:"description" form:"description" gorm:"type: varchar(255)"`
	Address     string         `json:"address" form:"address" gorm:"type: varchar(255)"`
	Image       string         `json:"image" form:"image" gorm:"type: varchar(255)"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
}

func (House) TableName() string {
	return "houses"
}
