# studdit
Backend server for Studdit built in Node.js.

# API-routes

## User
### create user
**route:** /api/user

**http:** post

**body:**
```sh
{
    "username": "username",
    "password": "password"
}
```

### update password
**route:** /api/user/:username

**http:** put

**body:**
```sh
{
    "username": "username",
    "password": "password",
    "newPassword": "password"
}
```

### deactivate user
**route:** /api/user/:username

**http:** delete

**body:**
```sh
{
    "username": "username",
    "password": "password"
}
```

## Thread
### create thread
**route:** /api/thread

**http:** post

**body:**
```sh
{
    "username": "username",
    "title": "thread title",
    "content": "thread content"
}
```

### update content
**route:** /api/thread/:title

**http:** put

**body:**
```sh
{
    "username": "username",
    "title": "thread title",
    "newCont": "new content"
}
```

### delete thread
**route:** /api/thread/:title

**http:** delete

**body:**
```sh
{
    "username": "username",
    "title": "thread title"
}
```
