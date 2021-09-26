import React, {Component} from 'react';
import dayjs from "dayjs";
import api from "../../helpers/api";
import {Urls} from "../../data";
import queryString from "../../helpers/queryString";
import {Spinner} from "../../components";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploads: null,
            loading: false
        }
    }

    componentDidMount() {
        const {year, month, day} = queryString.parse(this.props.location.search);
        this.setState({loading: true, year, month, day});
        api.getUploads()
            .then(({data}) => {
                const uploads = this.getFormattedData(data.results);
                this.setState({uploads, loading: false});
            })
            .catch((err) => {
                this.setState({loading: false});
                err.response && err.response.data && alert(err.response.data[0]);
            });
    }

    handleClick = (data) => {
        this.props.history.push({
            pathname: `${Urls.upload.base}/${data.item.id}`,
            state: data
        })
    };

    getFormattedData = (uploads) => {
        const data = {};
        uploads.forEach(upload => {
            const year = dayjs(upload.created).year();
            const month = dayjs(upload.created).format("MMMM");
            const day = dayjs(upload.created).date().toString().length > 1 ? dayjs(upload.created).date() : "0"+dayjs(upload.created).date();

            data[year] = {...data[year]};
            data[year][month] = {...data[year][month]};
            data[year][month][day] = data[year][month][day] ? [...data[year][month][day], upload] : [upload];
        });
        return data;
    };

    render() {
        const {uploads, loading, year, month, day} = this.state;
        return (
            <React.Fragment>
                <div className="max-w-md mx-auto flex flex-col items-center pb-12">
                    <div className="mt-6 mb-4">
                        <svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="3.75" height="11.2979" rx="1.875" transform="matrix(1 0 0 -1 0 35.1489)" fill="#0D0D12"/>
                            <rect width="3.75" height="31.383" rx="1.875" transform="matrix(1 0 0 -1 6.25 45.1915)" fill="#0D0D12"/>
                            <rect width="3.75" height="31.383" rx="1.875" transform="matrix(1 0 0 -1 18.75 45.1915)" fill="#0D0D12"/>
                            <rect width="3.75" height="16.3191" rx="1.875" transform="matrix(1 0 0 -1 25 37.6596)" fill="#0D0D12"/>
                            <rect width="3.75" height="31.383" rx="1.875" transform="matrix(1 0 0 -1 31.25 45.1915)" fill="#0D0D12"/>
                            <rect width="3.75" height="16.3191" rx="1.875" transform="matrix(1 0 0 -1 37.5 37.6596)" fill="#0D0D12"/>
                            <rect width="3.75" height="31.383" rx="1.875" transform="matrix(1 0 0 -1 43.75 45.1915)" fill="#0D0D12"/>
                            <rect width="3.75" height="18.8298" rx="1.875" transform="matrix(1 0 0 -1 50 38.9149)" fill="#0D0D12"/>
                            <rect width="3.75" height="8.78723" rx="1.875" transform="matrix(1 0 0 -1 56.25 33.8936)" fill="#0D0D12"/>
                            <rect width="3.75" height="59" rx="1.875" transform="matrix(1 0 0 -1 12.5 59)" fill="#0D0D12"/>
                        </svg>
                    </div>

                    <h2 className="text-lg text-center p-3 font-bold mb-5">
                        Uploads
                    </h2>
                    <div className="flex justify-start w-full px-5 cursor-pointer">
                        {uploads && year && <div className="mx-1" onClick={() => this.setState({year: null, month: null, day: null})}>{`< All`}</div>}
                        {uploads && year && <div className="mx-1" onClick={() => this.setState({month: null, day: null})}>{` / ${year}`}</div>}
                        {uploads && year && month && <div className="mx-1" onClick={() => this.setState({day: null})}>{` / ${month}`}</div>}
                        {uploads && year && month && day && <div className="mx-1">{` / ${day}`}</div>}
                    </div>

                    <div className="flex flex-col items-center p-5 w-full">
                        {uploads && !year && Object.keys(uploads).map(year => {
                            return <ProfileCard handleClick={(item) => this.setState({year: item})} item={year} key={year}/>
                        })}
                        {uploads && year && !month && Object.keys(uploads[year]).map(month => {
                            return <ProfileCard handleClick={(item) => this.setState({month: item})} item={month} key={month}/>
                        })}
                        {uploads && year && month && !day && Object.keys(uploads[year][month]).map(day => {
                            return <ProfileCard handleClick={(item) => this.setState({day: item})} item={day} key={day}/>
                        })}
                        {uploads && year && month && day && uploads[year][month][day].map(item => {
                            return <ProfileCard handleClick={() => this.handleClick({item, year, month, day})} item={item.title} rejected={item.rejected} published={item.published} key={item.id}/>
                        })}
                        {uploads && Object.keys(uploads).length === 0 && (
                            <div>Aucun upload disponible</div>
                        )}
                    </div>
                </div>
                {loading && (
                    <Spinner/>
                )}
            </React.Fragment>
        );
    }

}

const ProfileCard = ({item, handleClick, published, rejected}) => {

    const style = {boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #E4E4E4"};

    return (
        <div className="border rounded bg-white flex items-center justify-center w-full max-w-2xl p-3 my-1 cursor-pointer" style={style} onClick={() => handleClick(item)}>
            <div className="text-base capitalize text-black">
                {item}
            </div>
            {published && <div className="text-xs ml-4 text-white py-1 px-2 bg-green-500 font-medium rounded leading-tight">Publié</div>}
            {rejected && <div className="text-xs ml-4 text-white py-1 px-2 bg-red-600 font-medium rounded leading-tight">Rejeté</div>}
        </div>
    );
};
