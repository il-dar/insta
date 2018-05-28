class Post < ApplicationRecord
  belongs_to :user
  validates :image, presence: true
  validates :user_id, presence: true
  has_attached_file :image, :style => {:medium => "300x300!", :large => "500x500#"}
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  has_many :comments, dependent: :destroy
  has_many :likes , dependent: :destroy
  has_many :liking_users, :through => :likes, :source => :user, dependent: :destroy

end
