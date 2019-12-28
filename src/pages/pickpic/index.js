import React from 'react';
import Layout from '../../components/layout';
import './style.css';
import { Button,
         Row,
         Col,
         Card,
         CardTitle,
         Icon,
         Modal,
         MediaBox,
        } from 'react-materialize';

function PickPicPages(props){
    const {
        //Albums
        albums,
        albumSelected,
        createAlbum,
        onNewAlbum,
        showGallery,
        onAddNewAlbum,
        txtAlbumName,
        onChangeNewAlbum,
        listAlbums,
        onShowGallery,
        //Photos
        photos,
        createPhoto,
        txtPhotoName,
        txtPhotoDescription,
        filePhotoPath,
        onNewPhoto,
        onAddNewPhoto,
        onRemovePhoto,
        listPhotoByAlbum,
    } = props;

    return(
        <Layout>
            <div className="container-fluid">
                <Row className="item-list center">
                    {
                        //Album Section
                    }
                    <Col s={4} m={2} l={2} className="div-albums">
                        <h5>Albums</h5>
                        <Col s={6} m={6} l={4} className="item">
                            <Modal
                                header="Create Album"
                                id="modal-0"
                                options={{
                                    dismissible: true,
                                    endingTop: '10%',
                                    inDuration: 250,
                                    opacity: 0.5,
                                    outDuration: 250,
                                    preventScrolling: true,
                                    startingTop: '4%'
                                }}
                                trigger={
                                    <Button
                                        className="red pulse white"
                                        floating
                                        icon={<Icon>add</Icon>}
                                        large
                                        node="button"
                                        waves="light"
                                        title="Add New Album"
                                    />
                                }
                            >
                                <div className="form-group mt4">
                                    <div className="input-field div-create-album">
                                        <input  type="text"
                                                value={txtAlbumName}
                                                onChange={onChangeNewAlbum}
                                                id="txtAlbumName"/>
                                        <label htmlFor="txtAlbumName">Album Name</label>
                                        <Button
                                            className="blue"
                                            icon={<Icon>save</Icon>}
                                            small
                                            node="button"
                                            waves="light"
                                            title="Create Album"
                                            onClick={onNewAlbum}
                                        />
                                    </div>
                                </div>
                            </Modal>
                        </Col>
                        {albums.map((album, i) =>
                            album.albumName !== "" ?
                                <Col s={12} m={6} l={8}
                                     className="item album-item hoverable"
                                     key={album._id}
                                     onClick={() => onShowGallery(album)}
                                >
                                    <Card className="album-content"
                                        header={
                                            <CardTitle image="https://materializecss.com/images/sample-1.jpg">
                                                        {album.albumName}
                                            </CardTitle>
                                        }
                                    ></Card>
                                </Col>
                            :
                                <React.Fragment></React.Fragment>
                        )}
                    </Col>
                    {
                    //Photos Section
                    }    
                    <Col s={8} m={10} l={10} className="div-photos">
                        <h5>Photos</h5>
                        {showGallery ?
                            <React.Fragment>
                                {createPhoto ?
                                    <React.Fragment></React.Fragment>
                                :
                                    <div className="container modal-addPhoto">
                                        <Col s={12}
                                        >
                                            <Modal
                                                header="Add New Photo"
                                                id="modal-1"
                                                options={{
                                                    dismissible: true,
                                                    endingTop: '10%',
                                                    inDuration: 250,
                                                    opacity: 0.5,
                                                    outDuration: 250,
                                                    preventScrolling: true,
                                                    startingTop: '4%'
                                                }}
                                                trigger={
                                                    <Button
                                                        className="pulse white"
                                                        floating
                                                        icon={<Icon>add_a_photo</Icon>}
                                                        large
                                                        node="button"
                                                        waves="light"
                                                        title="Add New Photo"
                                                    />
                                                }
                                            >
                                                <div className="form-group container">
                                                    <div className="input-field">
                                                        <i className="material-icons prefix">title</i>
                                                        <input  id="photoTitle" 
                                                                type="text"
                                                                value={txtPhotoName} 
                                                                className="validate"/>
                                                        <label htmlFor="photoTitle">Photo Title</label>
                                                    </div>
                                                    <div className="input-field">
                                                        <i className="material-icons prefix">mode_edit</i>
                                                        <textarea id="textarea3" 
                                                                className="form-control txaPhotoDescription
                                                                materialize-textarea" 
                                                                data-length="145" 
                                                                >{txtPhotoDescription}</textarea>
                                                        <label htmlFor="textarea3">Write the Album description</label>
                                                    </div>
                                                    <div className="file-field">
                                                        <div className="btn red darken-4">
                                                            <i className="material-icons">add_a_photo</i>
                                                            <input  type="file" 
                                                                    value={filePhotoPath}
                                                                    multiple/>
                                                        </div>
                                                        <div className="file-path-wrapper">
                                                            <input  className="file-path validate" 
                                                                    type="text" 
                                                                    placeholder="Upload one or more files"
                                                                    accept="image/*"/>
                                                        </div>
                                                    </div>
                                                    <Row className="btn-group">
                                                        <Col s={6}>
                                                            <Button 
                                                                className="form-control"
                                                                large
                                                                node="button"
                                                                waves="light"
                                                                title="Upload"
                                                                onClick={onNewPhoto}
                                                            >
                                                                Updload
                                                            </Button>
                                                        </Col>
                                                        <Col s={6}>
                                                            <Button 
                                                                className="red form-control"
                                                                large
                                                                node="button"
                                                                waves="light"
                                                                title="Cancel"
                                                                //onClick={onAddNewPhoto}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Modal>
                                        </Col>
                                        {photos.map(photo => 
                                            <React.Fragment>
                                                {photos === [] ?
                                                    <div className="empty-Gallery">
                                                        <h2><i className="material-icons">error_outline</i>Ups </h2>
                                                        <h4>This album is empty</h4>
                                                        <h5>Lets add some photos</h5>
                                                    </div>
                                                :
                                                    <Col s={12}
                                                         m={4}
                                                    >
                                                        <Card
                                                            actions={[
                                                                <Button className="red btn-remove"
                                                                        icon={<Icon>delete</Icon>}
                                                                        floating
                                                                        big
                                                                        node="button"
                                                                        waves="light"
                                                                        title="Remove"
                                                                        //onClick={onNewAlbum}
                                                                >
                                                                    Remove
                                                                </Button>
                                                            ]}
                                                            header = {
                                                                <CardTitle image={photo.photoUrl} >
                                                                    <input  type="text" 
                                                                            className="inputpb"
                                                                            value={photo.photoName}/>
                                                                </CardTitle>
                                                            }
                                                        >
                                                            <div>
                                                                <textarea className="albumdescription">
                                                                    {photo.photoDescription}
                                                                </textarea>
                                                            </div>
                                                        </Card>
                                                    </Col>  
                                                }
                                            </React.Fragment>  
                                        )}  
                                    </div>  
                                }
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <div className="empty-Gallery-noSelected">
                                    <h2><i className="material-icons">error_outline</i>Hello!</h2>
                                    <h4>Show your best pics</h4>
                                    <h5>Create or Choose an album and enjoy</h5>
                                </div>
                            </React.Fragment>
                        }
                    </Col>
                </Row>
            </div>
        </Layout>
    );
}

export default PickPicPages;