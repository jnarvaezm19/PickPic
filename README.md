## PickPic ##
Is an application to upload images and group ones per album.
Also each photo contains title and descriptions. Then you can filter by title, description or date.

Based on React js.

## How it Works? ##
The app works adding an album to start, so you can add a lot of one. Then you have to select an album, the app will show you a buttom in the middle of the screen to add a image.
To add a image you could put it a title and description
Note: when you pick an image just wait, in the left side the one will load and give you a preview before upload.
Another thing that you can do is filter by title, description or date to find images.

You can visit it in: [PickPic](https://github.com/facebook/create-react-app).

## How to install
Steps:
1. you have to clone the repository:
#####`git clone https://github.com/jnarvaezm19/pickpic.git`
2. enter to project folder
#####`cd pickpic`
3. then you must to install all dependencies
#####`npm install`

## How to run ##
Locate into the app folder then execute:
#####`npm start`
 
#### Implemented Libraries ####
>React Materialize
>uikit-react
>classnames

To save the image I used the API of cloudinary. All the image upload in this app will be locate in this site.


## Issues Found ##
When I installed the react-materialize library, I cannot use the 'className' in the html tags so, the issue wasn't let me work. So to fix that I had to install classnames library  `npm install classnames`
I found how to fix in this link https://stackoverflow.com/questions/51197486/classnames-is-not-defined

### Anotations ###
This is my first react app, that's explain the basic structure, so I put the conecction with the generated API RestFul in the same file named index.js stored in /containers/index.js  that contains all the functions and methods. 
So.. why react? I choose react to develop this app because is a popular technology, further you actually use that, so I accepted your technical test but also I set a challange to me and thats was make this technical test in this technology to show me that I can do whatever challange, obviously I have a lot of thing to improve.