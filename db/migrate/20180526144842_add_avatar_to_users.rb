class AddAvatarToUsers < ActiveRecord::Migration[5.1]
  def add_avatar
    add_attachment :users, :avatar
  end

  def remove_avatar
    remove_attachment :users, :avatar
  end
end
