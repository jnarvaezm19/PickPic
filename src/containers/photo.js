import React, {Component} from 'react';
import PickPic from '../pages/pickpic';
import './album';

class PhotoContainer extends Component{

    constructor(props){
        super(props);
        this.state = {
            photos: [],
            createPhoto: false,
            txtPhotoName: "",
            txtPhotoDescription: "",
            filePhotoPath: [],
        }
        this.onNewPhoto = this.onNewPhoto.bind(this);
        this.onAddNewPhoto = this.onAddNewPhoto.bind(this);
        this.onRemovePhoto = this.onRemovePhoto.bind(this);
        this.listPhotoByAlbum = this.listPhotoByAlbum.bind(this);
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
                    ...this.state.photos,
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
            photos,
            createPhoto,
            txtPhotoName,
            txtPhotoDescription,
            filePhotoPath,
            albumSelected,
        } = this.state;
        return(
            <PickPic
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

export default PhotoContainer;