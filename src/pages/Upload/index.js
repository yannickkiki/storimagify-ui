import React from "react";
import {api} from "../../helpers";
import {Urls} from "../../data";

class Upload extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedImages: null,

        }
    }

    onFileInputChange = event => {
        this.setState({ selectedImages: event.target.files });
    };

    uploadFiles = () => {
        let formData = new FormData();
        if(!this.state.selectedImages){
            return;
        }
        console.log(this.state.selectedImages);
        Array.from(this.state.selectedImages).forEach(image => {
            formData.append(image.name, image);
        });
        api.uploadFiles(formData)
            .then(({data}) => {
                console.log("Upload success");
            })
            .catch((err) => {
                console.log("Upload failed");
                err.response && err.response.data && console.log(err.response.data[0]);
                throw(err);
            });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <input type="file" multiple accept="image/*" onChange={this.onFileInputChange}/>
                    <button type="submit" onClick={this.uploadFiles}>Upload</button>
                </div>
            </React.Fragment>
        );
    }

}

export default Upload;
