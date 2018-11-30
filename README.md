# studdit
Backend server for Studdit built in Node.js.

# API-routes

## User
### create user
**route:** /api/user\
**http:** post\
**body:**
```sh
{
    "username": "username",
    "password": "password"
}
```

### fetch user
**route:** /api/user/:username\
**http:** get

### update password
**route:** /api/user/:username\
**http:** put\
**body:**
```sh
{
    "username": "username",
    "password": "password",
    "newPassword": "password"
}
```

### deactivate user
**route:** /api/user/:username\
**http:** delete\
**body:**
```sh
{
    "username": "username",
    "password": "password"
}
```

## Thread
### create thread
**route:** /api/thread\
**http:** post\
**body:**
```sh
{
    "username": "username",
    "title": "thread title",
    "content": "thread content"
}
```

### update content
**route:** /api/thread/:title\
**http:** put\
**body:**
```sh
{
    "username": "username",
    "title": "thread title",
    "newContent": "new content"
}
```

### delete thread
**route:** /api/thread/:title\
**http:** delete\
**body:**
```sh
{
    "username": "username",
    "title": "thread title"
}
```

## Comment
### create comment
**route:** /api/thread/comment\
**http:** post\
**body:**
```sh
{
    "username": "username",
    "title": "thread title",
    "content": "comment content"
}
```

### create nested comment
**route:** /api/comment\
**http:** post\
**body:**
```sh
{
    "username": "username",
    "comment": "parent comment content",
    "content": "comment content"
}
```

### edit comment
**route:** /api/thread/:title\
**http:** put\
**body:**
```sh
{
    "username": "username",
    "title": "comment content",
    "newContent": "new content"
}
```

### delete comment
**route:** /api/thread/:title\
**http:** delete\
**body:**
```sh
{
    "title": "thread title",
    "comment": "comment content"
}
```
