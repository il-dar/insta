class PostsController < ApplicationController
validates :image, presence: true
has_attached_file :image

def index
end

end
