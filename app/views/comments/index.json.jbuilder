json.comments @comments do |comment|
  json.user_name comment.user.user_name
  json.content comment.content
  json.id comment.id
  json.created_at comment.created_at
end
