class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  validates :user_name, presence: true, length: { minimum: 4, maximum: 16 }
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_posts, :through => :likes, :source => :post


  def like!(post)

    self.likes.create!(post_id: post.id)

  end

  def unlike!(post)

    like = self.likes.find_by_post_id(post.id)
    like.destroy!

  end

  def liked?(post)

    self.likes.find_by_post_id(post.id)

  end

end
