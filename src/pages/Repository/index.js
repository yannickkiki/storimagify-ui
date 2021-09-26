import React, {Component} from 'react';
import api from "../../helpers/api";
import {Spinner} from "../../components";
import {Urls} from "../../data";

export default class Repository extends Component {

    constructor(props) {
        super(props);
        this.state = {images: null, loading: false}
    }

    componentDidMount() {
        this.setState({loading: true});
        api.getImages()
            .then(({data}) => {
                console.log("Data", data);
                this.setState({images: data, loading: false});
            })
            .catch((err) => {
                this.setState({loading: false});
                err.response && err.response.data && alert(err.response.data[0]);
            });
    }

    handleClick = () => {
        this.props.history.push(Urls.upload.base);
    }

    render() {
        const {images, loading} = this.state;
        return (
            <React.Fragment>
                <button onClick={this.handleClick} type="button">Upload image</button>
                <div>
                    {images && images.map(image => {
                        return <img key={image.id} src={image.url} alt="ok"/>;
                    })}
                </div>
                {loading && (
                    <Spinner/>
                )}
            </React.Fragment>
        );
    }
}
