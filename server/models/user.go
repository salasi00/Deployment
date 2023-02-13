package models

import "time"

type User struct {
	ID        int       `json:"id"`
	RoleID    int       `json:"roleid"`
	Role      Role      `json:"role"`
	Fullname  string    `json:"fullname" form:"fullname" gorm:"type: varchar(255)"`
	Username  string    `json:"username" form:"fullname" gorm:"type: varchar(255)"`
	Email     string    `json:"email" form:"email" gorm:"type: varchar(255)"`
	Password  string    `json:"password" form:"password" gorm:"type: varchar(255)"`
	Gender    string    `json:"gender" form:"gender" gorm:"type: varchar(255)"`
	Phone     string    `json:"phone" form:"phone" gorm:"type: varchar(255)"`
	Address   string    `json:"address" form:"address" gorm:"type: varchar(255)"`
	Image     string    `json:"image" form:"image" gorm:"type: varchar(255)"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (User) TableName() string {
	return "users"
}
