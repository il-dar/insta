json.comments @comments do |comment|
  json.user_name comment.user.user_name
  json.content comment.content
  json.id comment.id
  json.avatar_url comment.user.avatar.url
  json.created_at comment.created_at
end
