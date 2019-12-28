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
            createPhoto: false,
            txtPhotoName: "",
            txtPhotoDescription: "",
            filePhotoPath: [],
        }
        
        this.listAlbums();
        this.onNewAlbum = this.onNewAlbum.bind(this);
        this.onAddNewAlbum = this.onAddNewAlbum.bind(this);
        this.onChangeNewAlbum = this.onChangeNewAlbum.bind(this);
        this.listAlbums = this.listAlbums.bind(this);
        this.onShowGallery = this.onShowGallery.bind(this);

        this.onNewPhoto = this.onNewPhoto.bind(this);
        this.onAddNewPhoto = this.onAddNewPhoto.bind(this);
        this.onRemovePhoto = this.onRemovePhoto.bind(this);
        this.listPhotoByAlbum = this.listPhotoByAlbum.bind(this);

    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.listAlbums(),
            100
          );
    }

    //method to show the form to add new album
    onAddNewAlbum(){
        this.setState({
            createAlbum: !this.state.createAlbum,
            showGallery: false
        });
    }

    //Method to prepare new album
    onNewAlbum(){
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
                albumName: this.state.txtAlbumName
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
        this.setState({
            showGallery: true,
            createPhoto: false,
            photos:[
                ...this.state.photos,
                {
                    photoId: Date.now(),
                    albumId: this.state.albums._id,
                    photoName: '',
                    photoDescription: '',
                    photoUrl: '',
                    photoDateCreated: Date.now(),
                    isEditing: false
                }
            ]
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
                this.setState({
                    photos: [],
                    photos:data
                });
            });
    }

    onRemovePhoto(photo){
        const { photos } = this.state;
        const photoIndex = photos.findIndex(n => n.photoId === photo.photoId);
        if(photoIndex === -1){
            return;
        }
        const newPhotos = photos.slice();
        newPhotos.splice(photoIndex,1);

        this.setState({
            photos: newPhotos
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

                photos={photos}
                createPhoto={createPhoto}
                txtPhotoName={txtPhotoName}
                txtPhotoDescription={txtPhotoDescription}
                filePhotoPath={filePhotoPath}
                onNewPhoto={this.onNewPhoto}
                onAddNewPhoto={this.onAddNewPhoto}
                onRemovePhoto={this.onRemovePhoto}
                listPhotoByAlbum={this.listPhotoByAlbum}
            />
        )
    }
}

export default AlbumContainer;