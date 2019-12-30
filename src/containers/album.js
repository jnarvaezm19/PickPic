import React, {Component} from 'react';
import PickPic from '../pages/pickpic';
import PhotoContainer from './photo';

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
        this.onSelectSearchType = this.onSelectSearchType.bind(this);
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.listAlbums(),
            100
          );
          setInterval(
              () => this.state.photos, 100
          );
          setInterval(
              () => this.listPhotoByAlbum(this.state.albumSelected._id),100
          );
    }

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
            isImageInCache: true,
            filePhotoPath: file.secure_url
        });
    }

    //method to show the form to add new album
    onAddNewAlbum(){
        this.setState({
            createAlbum: !this.state.createAlbum,
            showGallery: false
        });
    }
    onGetCurrentDate(){
        let newDate = new Date();
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let date = day.toString() + "-" + month.toString() + "-" + year.toString();
        return date;
    }
    //Method to prepare new album
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
        });
        this.state.txtAlbumName = "";
        this.listAlbums();
    }

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

    onChangeNewAlbum(event){
        const albumTitle = event.target.value;
        this.setState({
            txtAlbumName: albumTitle
        });
    }

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
                albums: post
            });
        });
        this.listAlbums();
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

    //Method to prepare new photo
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
                photoDateCreated: date
            })
        });
        this.state.txtPhotoName = "";
        this.state.txtPhotoDescription = "";
        this.isImageInCache = false;
        this.listPhotoByAlbum(this.state.albumSelected._id);
        console.log(this.state.photos);
    }

    onChangeNewPhotoName(event){
        const photoName = event.target.value;
        this.setState({
            txtPhotoName: photoName
        });
    }

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

    onRemovePhoto(photo){
        fetch('http://localhost:3001/photo/'+photo._id,{
            method: "DELETE"
        }).then(res => {
            let post = this.state.photos.filter(post => post._id !== photo._id);
            this.setState({
                photos: post
            });
        });
        this.listPhotoByAlbum(this.state.albumSelected._id);
    }

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

    onSelectSearchType(event){
        alert(event.target.value);
    }

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
            });
            this.state.createPhoto = false;
    }
    onChangeSearchByDate(event){
        var date = event.toString();
        var dateformat = new Date(date);
        alert(dateformat);
        /*const search = event.target.value;
        this.state.createPhoto = false;
        this.setState({
            txtSearchByDate: search,
            createPhoto: false
        });
        fetch('http://localhost:3001/photo/search/'+search)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    ...this.state.photos,
                    photos:data
                });
            });*/
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
                onSelectSearchType={this.onSelectSearchType}
            />
        )
    }
}

export default AlbumContainer;