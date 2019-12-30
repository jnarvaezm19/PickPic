import React, {Component} from 'react';
import PickPic from '../pages/pickpic';

class AlbumContainer extends Component{

    constructor(props){
        super(props);
        this.state = {
            albums: [],
            albumSelected: {},
            createAlbum: false,
            txtAlbumName: "",

            photos: [],
            findedPhoto: [],
            createPhoto: false,
            txtPhotoName: "",
            txtPhotoDescription: "",
            filePhotoPath: "",
            filePhotoPathTemp: [],

            isImageInCache: false,
            uploadImage: "",
            
            isSearchByNameDesc: "text",
            txtSearchByNameDesc: "",
            txtSearchByDate: ""
        }
        
        this.listAlbums();
        this.onNewAlbum = this.onNewAlbum.bind(this);
        this.onAddNewAlbum = this.onAddNewAlbum.bind(this);
        this.onChangeNewAlbum = this.onChangeNewAlbum.bind(this);
        this.listAlbums = this.listAlbums.bind(this);
        this.onShowGallery = this.onShowGallery.bind(this);
        this.onRemoveAlbum = this.onRemoveAlbum.bind(this);

        this.onNewPhoto = this.onNewPhoto.bind(this);
        this.onAddNewPhoto = this.onAddNewPhoto.bind(this);
        this.onRemovePhoto = this.onRemovePhoto.bind(this);
        this.listPhotoByAlbum = this.listPhotoByAlbum.bind(this);
        this.onChangeNewPhotoName = this.onChangeNewPhotoName.bind(this);  
        this.onChangeNewPhotoDescription = this.onChangeNewPhotoDescription.bind(this);

        this.uploadImage = this.uploadImage.bind(this);

        this.onEditingPhotoName = this.onEditingPhotoName.bind(this);
        this.onEditingPhotoDescription = this.onEditingPhotoDescription.bind(this); 

        this.onChangeSearchByNameDesc = this.onChangeSearchByNameDesc.bind(this);
        this.onChangeSearchByDate = this.onChangeSearchByDate.bind(this);
    }

    //Method to upload images and save in clodinary
    uploadImage = async e =>{

        const files = e.target.files;
        const image = new FormData();
        image.append('file',files[0]);
        image.append('upload_preset','jonathan');
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dtfdylnjz/image/upload", 
            {
                method: "POST",
                body: image
            }
        );
        const file = await res.json();
        this.setState({
            filePhotoPathTemp: files[0],
            isImageInCache: true,
            filePhotoPath: file.secure_url
        });
        console.log(res.url);
    }

    //method to show the form to add new album
    onAddNewAlbum(){
        this.setState({
            createAlbum: !this.state.createAlbum,
            showGallery: false
        });
    }

    //Method to return the date format
    onGetCurrentDate(){
        let newDate = new Date();
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let date = day.toString() +  "-" + month.toString() + "-" + year.toString() ;
        return date;
    }

    //Method that consume the API rest to Submit an Album
    onNewAlbum(){
        const date = this.onGetCurrentDate();
        if(this.state.txtAlbumName.trim() === ""){
            this.setState({
                createAlbum : false
            });
            return;
        }
        fetch('http://localhost:3001/album', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                albumName: this.state.txtAlbumName,
                createdDate: date
            })
        }).then(res => {
            this.listAlbums();
            this.state.txtAlbumName = "";
        });
    }

    //Method that consume the API rest to List All Albums stored
    listAlbums(){
        fetch('http://localhost:3001/album')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    ...this.state.albums,
                    albums:data
                });
            });
    }

    //Method to get the new album title 
    onChangeNewAlbum(event){
        const albumTitle = event.target.value;
        this.setState({
            txtAlbumName: albumTitle
        });
    }

    //Method to remove an Album
    onRemoveAlbum(album){
        fetch('http://localhost:3001/photo/album/'+album._id,{
            method: "DELETE"
        }).then(res => {
        });
        fetch('http://localhost:3001/album/'+album._id,{
            method: "DELETE"
        }).then(res => {
            let post = this.state.albums.filter(post => post._id !== album._id);
            this.setState({
                albums: post,
                createPhoto: false,
                albumSelected : {},
                photos: [],
                findedPhoto : []
            });
            this.listAlbums();
        });
    }

    //method to show the form to add new album
    onShowGallery(album){
        if(album.albumName.trim() !== ""){
            this.setState({
                showGallery: true
            });
        }else{
            this.setState({
                showGallery: !this.state.showGallery
            });
        }
        this.state.albumSelected = album;
        this.listPhotoByAlbum(this.state.albumSelected._id);
    }

    //Method to save a image consuming the API RestFul
    onNewPhoto(){
        const date = this.onGetCurrentDate();
        fetch('http://localhost:3001/photo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                albumId: this.state.albumSelected._id,
                photoName: this.state.txtPhotoName,
                photoDescription: this.state.txtPhotoDescription,
                photoUrl: this.state.filePhotoPath,
                photoDateCreated: date,
            })
        }).then(res =>{
            this.state.filePhotoPathTemp = [];
            this.state.txtPhotoName = "";
            this.state.txtPhotoDescription = "";
            this.state.isImageInCache = false;
            this.state.filePhotoPath = "";
            this.listPhotoByAlbum(this.state.albumSelected._id);
        });
    }

    //Method to get photo title 
    onChangeNewPhotoName(event){
        const photoName = event.target.value;
        this.setState({
            txtPhotoName: photoName
        });
    }

    //Method to get photo title 
    onChangeNewPhotoDescription(event){
        const photoDescription = event.target.value;
        this.setState({
            txtPhotoDescription: photoDescription
        });
    }

    //method to show the form to add new album
    onAddNewPhoto(){
        this.setState({
            txtPhotoName: "",
            createPhoto: !this.state.createPhoto
        });
    }

    //Method to list all images to specific album consuming the API RestFul 
    listPhotoByAlbum(albumId){
        fetch('http://localhost:3001/photo/'+albumId)
            .then(res => res.json())
            .then((data) => {
                if(data.length <= 0){
                    this.setState({
                        photos: []
                    });
                    return;
                }   
                this.setState({
                    ...this.state.photos,
                    photos:data
                });
            });
    }

    //Method to delete a specific images consuming the API RestFul
    onRemovePhoto(photo){
        fetch('http://localhost:3001/photo/'+photo._id,{
            method: "DELETE"
        }).then(res => {
            let post = this.state.photos.filter(post => post._id !== photo._id);
            this.setState({
                photos: post
            });
            this.listPhotoByAlbum(this.state.albumSelected._id);
        });
    }

    //to get the new image title, then update in the database using the API RestFul
    onEditingPhotoName(photo){
        if(this.state.txtPhotoName.trim() === ""){
            return;
        }
        fetch('http://localhost:3001/photo/'+photo._id,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                photoName: this.state.txtPhotoName,
                photoDescription: photo.photoDescription
            })
        });
    }

    //to get the new image description, then update in the database using the API RestFul
    onEditingPhotoDescription(photo){
        if(this.state.txtPhotoDescription.trim() === ""){
            return;
        }
        fetch('http://localhost:3001/photo/'+photo._id,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                photoName: photo.photoName,
                photoDescription: this.state.txtPhotoDescription
            })
        });
    }

    //to get the filter searching by title or description
    onChangeSearchByNameDesc(event){
        const search = event.target.value;
        this.state.createPhoto = false;
        this.setState({
            txtSearchByNameDes: search,
            createPhoto: false,
            albumSelected: {}
        });
        fetch('http://localhost:3001/photo/search/'+search)
            .then(res => res.json())
                .then((data) => {
                    this.setState({
                        findedPhoto:data
                    });
            this.state.createPhoto = false;
            });
    }

    //to get the filter searching by date
    onChangeSearchByDate(event){
        let date = new Date(event);
        let search = date.toLocaleDateString().toString();
        search = search.replace("/","-");
        search = search.replace("/","-");
        console.log(search);
        this.setState({
            txtSearchByDate: search,
            createPhoto: false,
            albumSelected: {}
        });
        fetch('http://localhost:3001/photo/search/date/'+search)
            .then(res => res.json())
                .then((data) => {
                    this.setState({
                        findedPhoto:data
                });
                this.state.createPhoto = false;
            });
    }

    render(){
        const {
            albums,
            createAlbum,
            showGallery,
            txtAlbumName,
            albumSelected,

            photos,
            createPhoto,
            txtPhotoName,
            txtPhotoDescription,
            filePhotoPath,
            isImageInCache,
            findedPhoto,
            filePhotoPathTemp,

            isSearchByNameDesc,
            txtSearchByNameDes,
            txtSearchByDate,
        } = this.state;
        return(
            <PickPic
                albums={albums}
                albumSelected={albumSelected}
                createAlbum={createAlbum}
                showGallery={showGallery}
                txtAlbumName={txtAlbumName}
                onNewAlbum={this.onNewAlbum}
                onAddNewAlbum={this.onAddNewAlbum}
                onChangeNewAlbum={this.onChangeNewAlbum}
                listAlbums={this.listAlbums}
                onShowGallery={this.onShowGallery}
                onRemoveAlbum={this.onRemoveAlbum}

                photos={photos}
                createPhoto={createPhoto}
                txtPhotoName={txtPhotoName}
                txtPhotoDescription={txtPhotoDescription}
                filePhotoPath={filePhotoPath}
                filePhotoPathTemp={filePhotoPathTemp}
                findedPhoto={findedPhoto}
                onNewPhoto={this.onNewPhoto}
                onAddNewPhoto={this.onAddNewPhoto}
                onRemovePhoto={this.onRemovePhoto}
                listPhotoByAlbum={this.listPhotoByAlbum}
                onChangeNewPhotoName={this.onChangeNewPhotoName}  
                onChangeNewPhotoDescription={this.onChangeNewPhotoDescription}

                onEditingPhotoName={this.onEditingPhotoName}
                onEditingPhotoDescription={this.onEditingPhotoDescription}

                isImageInCache={this.isImageInCache}
                uploadImage={this.uploadImage}

                isSearchByNameDesc={this.isSearchByNameDesc}
                txtSearchByNameDesc={this.txtSearchByNameDesc}
                txtSearchByDate={this.txtSearchByDate}
                onChangeSearchByNameDesc={this.onChangeSearchByNameDesc}
                onChangeSearchByDate={this.onChangeSearchByDate}
            />
        )
    }
}

export default AlbumContainer;