##  Bookstore on express

### Requirements:

* docker
* yarn

create (or copy) media folder on app

    appfolder
     |_media
     |_server
     |_app
     |...other files

### Run project
#### 1. up db
    yarn dbup
    
#### 2. migration & seed
    yarn data

#### 3. up server 
    yarn start

### Stop project
#### 1. down server 
    yarn stop

#### 2. down db
    yarn dbdown

###Test accounts

#### Admin user

    lolo@pepe.lo
    Lolkeklol1

#### Users

    email0@fake.fk
    password0
    ....
    email19@fake.fk
    password19
