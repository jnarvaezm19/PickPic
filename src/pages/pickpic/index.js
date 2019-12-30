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
         DatePicker,
         Select,
         Carousel,
         Dropdown,
         Divider,
         ProgressBar,
         Toast,
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
        onRemoveAlbum,
        //Photos
        photos,
        createPhoto,
        txtPhotoName,
        txtPhotoDescription,
        filePhotoPath,
        filePhotoPathTemp,
        onNewPhoto,
        onAddNewPhoto,
        onRemovePhoto,
        listPhotoByAlbum,
        onChangeNewPhotoName,
        onChangeNewPhotoDescription,
        onEditingPhotoName,
        onEditingPhotoDescription,
        isImageInCache,
        uploadImage,
        findedPhoto,
        //Searching
        isSearchByNameDesc,
        txtSearchByNameDes,
        txtSearchByDate,
        onChangeSearchByNameDesc,
        onChangeSearchByDate,
        onSelectSearchType,
    } = props;

    const M = window.M;
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(elems, {});
    });

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
                                    <Card className="album-content" key={album._id}
                                        header={
                                            <CardTitle image="https://materializecss.com/images/sample-1.jpg">
                                                        <Button className="btn-removeAlbum"
                                                                icon={<Icon>close</Icon>}
                                                                small
                                                                floating
                                                                node="button"
                                                                title="Remove Album"
                                                                onClick={() => onRemoveAlbum(album)}
                                                        />
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
                        <div className="container-fluid filter-div">
                            <div>
                                {isSearchByNameDesc !== "text" &&
                                    <React.Fragment>
                                        <div className="div-search">
                                            <div className="input-field txtSearch">
                                                <i className="material-icons prefix">search</i>
                                                <input  id="icon_prefix" 
                                                        type="text" 
                                                        className="validate"
                                                        placeholder="Search By Photo Name or Description"
                                                        defaultValue={txtSearchByNameDes}
                                                        onChange={onChangeSearchByNameDesc}/>
                                            </div>
                                            <div className="input-field txtSearch">
                                                <i className="material-icons prefix datepicker">date_range</i>
                                                <DatePicker
                                                    options={{
                                                        format: 'yyyy-mm-dd',
                                                        onSelect: onChangeSearchByDate
                                                    }}
                                                    placeholder="Search by date"
                                                />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                        {showGallery && findedPhoto.length <= 0 ?
                            <React.Fragment>
                                {createPhoto ?
                                    <React.Fragment></React.Fragment>
                                :
                                    <div className=" modal-addPhoto">
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
                                                <Row>
                                                    <Col s={12} 
                                                        m={4}
                                                    >
                                                        {filePhotoPath.trim() !== "" ?
                                                            <div className="preAddPhoto">
                                                                <MediaBox>
                                                                    <img className="materialboxed" src={filePhotoPath} />
                                                                </MediaBox>
                                                            </div>
                                                        :
                                                            <React.Fragment>     
                                                                <div className="preAddPhotoP center">
                                                                </div>
                                                            </React.Fragment>
                                                        }
                                                    </Col>
                                                    <Col s={12} 
                                                        m={8} 
                                                    >
                                                        <div className="form-group container">
                                                            <div className="input-field">
                                                                <i className="material-icons prefix">title</i>
                                                                <input  id="photoTitle" 
                                                                        type="text"
                                                                        value={txtPhotoName}
                                                                        onChange={onChangeNewPhotoName} 
                                                                        className="validate"/>
                                                                <label htmlFor="photoTitle">Photo Title</label>
                                                            </div>
                                                            <div className="input-field">
                                                                <i className="material-icons prefix">mode_edit</i>
                                                                <textarea id="photoDescription" 
                                                                        className="form-control txaPhotoDescription
                                                                        materialize-textarea" 
                                                                        data-length="145" 
                                                                        onChange={onChangeNewPhotoDescription}
                                                                        value={txtPhotoDescription}
                                                                >
                                                                </textarea>
                                                                <label htmlFor="photoDescription">Write the Album description</label>
                                                            </div>
                                                            <div className="file-field">
                                                                <div className="btn red darken-4">
                                                                    <i className="material-icons">add_a_photo</i>
                                                                    <input  type="file"
                                                                            onChange={uploadImage}
                                                                            accept="image/png, image/jpeg"

                                                                    />
                                                                </div>
                                                                <div className="file-path-wrapper">
                                                                    <input  className="file-path validate" 
                                                                            type="text" 
                                                                            placeholder="Upload one or more files"
                                                                            accept="image/*"/>
                                                                </div>
                                                            </div>
                                                            <Row className="btn-group">
                                                                <Col s={12}>
                                                                    <Button 
                                                                        className="form-control"
                                                                        large
                                                                        node="button"
                                                                        waves="light"
                                                                        title="Upload"
                                                                        onClick={onNewPhoto}
                                                                    >
                                                                        Upload
                                                                    </Button>
                                                                </Col>
                                                                
                                                            </Row>
                                                        </div>
                                                    
                                                    </Col>
                                                    
                                                </Row>
                                            </Modal>
                                        </Col>
                                        {photos.length <= 0 ?
                                            <div className="empty-Gallery-noSelected">
                                                <h2><i className="material-icons">error_outline</i>Ups </h2>
                                                <h4>This album is empty</h4>
                                                <h5>Lets add some photos</h5>
                                            </div>
                                            :
                                            <React.Fragment>
                                                {photos.map(photo => 
                                                    <React.Fragment>
                                                        {photo === "" ?
                                                            <div className="">
                                                                <h2><i className="material-icons">error_outline</i>Ups </h2>
                                                                <h4>This album is empty</h4>
                                                                <h5>Lets add some photos</h5>
                                                            </div>
                                                        :
                                                            <Col s={12}
                                                                m={4}
                                                                key={photo._id}
                                                            >
                                                                <Card className="cardListPhotos"
                                                                    actions={[
                                                                        <Button className="red btn-remove"
                                                                                icon={<Icon>delete</Icon>}
                                                                                floating
                                                                                node="button"
                                                                                waves="light"
                                                                                title="Remove"
                                                                                onClick={() => onRemovePhoto(photo)}
                                                                        >
                                                                            Remove
                                                                        </Button>
                                                                    ]}
                                                                    header = {
                                                                        <CardTitle image={photo.photoUrl}>
                                                                            <input  type="text" 
                                                                                    className="inputpb"
                                                                                    onChange={onChangeNewPhotoName}
                                                                                    defaultValue={photo.photoName}
                                                                                    onBlur={() => onEditingPhotoName(photo)}/>
                                                                        </CardTitle>
                                                                    }
                                                                >
                                                                    <div>
                                                                        <textarea className="albumdescription"
                                                                                onChange={onChangeNewPhotoDescription}
                                                                                onBlur={() => onEditingPhotoDescription(photo)}
                                                                                defaultValue={photo.photoDescription}>
                                                                        </textarea>
                                                                    </div>
                                                                </Card>
                                                            </Col>  
                                                        }
                                                    </React.Fragment>  
                                                )} 
                                            </React.Fragment>
                                        } 
                                    </div>  
                                }
                            </React.Fragment>
                        :
                            <React.Fragment>
                                {findedPhoto.map(photo => 
                                    <Col s={12}
                                         m={4}
                                         key={photo._id}
                                    >
                                        <Card   key={photo._id}
                                                header = {
                                                    <CardTitle image={photo.photoUrl} >
                                                        <p className="inputpb">
                                                            {photo.photoName}
                                                        </p>
                                                    </CardTitle>
                                                }
                                        >
                                            <div>
                                                <p className="albumdescription">
                                                    {photo.photoDescription}
                                                </p>
                                            </div>
                                        </Card>
                                    </Col> 
                                )}
                                {findedPhoto.length <= 0 &&
                                    <div className="empty-Gallery-noSelected">
                                        <h2><i className="material-icons">error_outline</i>Hello!</h2>
                                        <h4>Show your best pics</h4>
                                        <h5>Create or Choose an album and enjoy</h5>
                                    </div>
                                }
                            </React.Fragment>
                        }
                    </Col>
                </Row>

                 
            </div>
        </Layout>
    );
}

export default PickPicPages;