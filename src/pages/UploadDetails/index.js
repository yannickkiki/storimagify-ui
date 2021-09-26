import React, {useState} from "react";
import dayjs from "dayjs";
import {Urls} from "../../data";
import {api} from "../../helpers";
import {Spinner} from "../../components";

class UploadDetails extends React.Component{

  /** Constructor*/

  constructor(props) {
    super(props);
    const upload = this.props.location.state.item;
    this.state = {
      infos: null,
      socials: {
        share_link_facebook: upload.share_link_facebook,
        share_link_instagram: upload.share_link_instagram,
        share_link_tiktok: upload.share_link_tiktok,
        share_link_twitter: upload.share_link_twitter,
        share_link_youtube: upload.share_link_youtube
      }
    };
  }

  /** End constructor*/


  /** Methods*/

  //Life cycle
  componentDidMount() {
    const {location} = this.props;
    const upload = location.state.item;
    this.setState({rejectMotif: upload.rejection_motif});
    api.getUser(upload.account)
        .then(({data}) => {
          const infos = {};
          infos.title = upload.title;
          infos.artist_name = data.artist_name;
          infos.featuring = upload.featuring;
          infos.label_name = data.label_name;
          if(data.social_refs_validated) {
            infos.youtube = data.social_ref_youtube;
            infos.facebook = data.social_ref_facebook;
            infos.instagram = data.social_ref_instagram;
            infos.twitter = data.social_ref_twitter;
            infos.tiktok = data.social_ref_tiktok;
            infos.snapchat = data.social_ref_snapchat;
          }
          Object.keys(infos).forEach(key => !infos[key] && delete infos[key]);
          this.setState({infos})

        })
        .catch(err => {
          err.response && err.response.data && alert(err.response.data[0])
        })
  }

  //Setters

  //Getters


  //Helpers

  rejectUpload = () => {
    const {rejectMotif} = this.state;
    const upload = this.props.location.state.item;
    const {year, month, day} = this.props.location.state;
    if (!rejectMotif) return;
    this.setState({loading: true});
    api.rejectUpload(upload.id, {rejection_motif: rejectMotif})
        .then(() => {
          this.props.history.push(`${Urls.home.base}?year=${year}&month=${month}&day=${day}`);
        })
        .catch((err) => {
          this.setState({loading: false});
          err.response && err.response.data && alert(err.response.data[0])
        })
  };

  submitSocialLinks = () => {
    const {socials} = this.state;

    const upload = this.props.location.state.item;
    const {year, month, day} = this.props.location.state;
    this.setState({loading: true});
    api.updateUpload(upload.id, socials)
        .then(() => {
          this.props.history.push(`${Urls.home.base}?year=${year}&month=${month}&day=${day}`);
        })
        .catch((err) => {
          this.setState({loading: false});
          err.response && err.response.data && alert(err.response.data[0])
        })
  };


  //Events
  goBack = (year, month, day) => {
    day && this.props.history.push(`${Urls.home.base}?year=${year}&month=${month}&day=${day}`);
    month && !day && this.props.history.push(`${Urls.home.base}?year=${year}&month=${month}`);
    !month && this.props.history.push(`${Urls.home.base}?year=${year}`);
    !year && this.props.history.push(`${Urls.home.base}`);
  };

  onInputChange = (key, value) => {
    this.setState(prev => {
      const {socials} = prev;
      socials[key] = value;
      return {socials};
    });
  };


  /** End methods*/


  /** Render*/

  render() {

    const {location} = this.props;
    const upload = location.state.item;
    const year = dayjs(upload.created).year();
    const month = dayjs(upload.created).format("MMMM");
    const day = dayjs(upload.created).date().toString().length > 1 ? dayjs(upload.created).date() : "0"+dayjs(upload.created).date();
    const shares = {
      share_link_facebook: upload.share_link_facebook,
      share_link_instagram: upload.share_link_instagram,
      share_link_tiktok: upload.share_link_tiktok,
      share_link_twitter: upload.share_link_twitter,
      share_link_youtube: upload.share_link_youtube
    };

    const {rejectMotif, infos, loading, socials} = this.state;
    const socialList = ["youtube", "facebook", "instagram", "twitter", "tikTok"];

    return (
      <React.Fragment>
        <div className="max-w-md mx-auto flex flex-col items-center p-5 pb-12">
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
            Details d'upload
          </h2>
          <div className="flex justify-start w-full cursor-pointer">
            <div className="mx-1" onClick={() => this.goBack()}>{`< All`}</div>
            <div className="mx-1" onClick={() => this.goBack(year)}>{` / ${year}`}</div>
            <div className="mx-1" onClick={() => this.goBack(year, month)}>{` / ${month}`}</div>
            <div className="mx-1" onClick={() => this.goBack(year, month, day)}>{` / ${day}`}</div>
            <div className="mx-1">{` / ${upload.title}`}</div>
          </div>
          {upload.published && <div className="text-xs mt-6 text-white py-1 px-4 bg-green-500 font-medium rounded">Publié : {dayjs(upload.published).format("DD MMMM YYYY")}</div>}
          {upload.rejected && <div className="text-xs mt-6 text-white py-1 px-4 bg-red-600 font-medium rounded">Rejeté : {dayjs(upload.rejected).format("DD MMMM YYYY")}</div>}

          <div className="mt-10 w-full">
            <div
                onClick={() => window.open(upload.cover)}
                style={{backgroundColor: "#202027"}}
                className="mb-3 rounded h-12 w-full border-0 px-3 text-sm text-gray-100 flex justify-center items-center font-semibold cursor-pointer"
            >
              Voir la cover
            </div>
            <div
                onClick={() => window.open(upload.video)}
                style={{backgroundColor: "#202027"}}
                className="mb-6 rounded h-12 w-full border-0 px-3 text-sm text-gray-100 flex justify-center items-center font-semibold cursor-pointer"
            >
              Voir la vidéo
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold">
                Infos
              </h3>
              <div className="w-full mt-3 bg-gray-100 rounded flex flex-col pt-6 px-4 pb-0">
                {
                  infos && Object.keys(infos).map(key => <Info label={key} value={infos[key]} key={key}/>)
                }
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold">
                Liens de publication
              </h3>
              <div className="w-full mt-3 flex flex-col">
                {
                  socialList.map(social => <SocialInput socials={socials} onChange={this.onInputChange} label={social} key={social}/>)
                }
              </div>
              <button
                  className={`py-2 px-5 text-white rounded text-sm font-semibold bg-blue-600 ${Object.keys(socials).filter(key => socials[key].split(" ").join("") !== "").length === 5 && JSON.stringify(socials) !== JSON.stringify(shares) ? '' : 'opacity-50 cursor-not-allowed'}`}
                  onClick={this.submitSocialLinks}
                  disabled={Object.keys(socials).filter(key => socials[key].split(" ").join("") !== "").length !== 5 && JSON.stringify(socials) === JSON.stringify(shares)}
              >
                Soumettre
              </button>
            </div>

            <div className="flex flex-col items-start w-full mt-8">
              <h3 className="text-lg font-bold my-3">
                Rejet
              </h3>
              <textarea
                  value={rejectMotif}
                  onChange={(e) => this.setState({rejectMotif: e.target.value})}
                  className="p-3 rounded h-32 w-full outline-none"
                  style={{border: "1px solid #E4E4E4"}}
              />
              <button
                  className={`py-2 px-5 text-white my-3 rounded text-sm font-semibold outline-none mt-6 ${rejectMotif && !(rejectMotif.split("\n").join("").split(" ").join("") === upload.rejection_motif.split("\n").join("").split(" ").join("") || !rejectMotif.split("\n").join("").split(" ").join("")) ? '' : 'opacity-50 cursor-not-allowed'}`}
                  style={{backgroundColor: "#E53935"}}
                  onClick={this.rejectUpload}
                  disabled={rejectMotif && (rejectMotif.split("\n").join("").split(" ").join("") === upload.rejection_motif.split("\n").join("").split(" ").join("") || !rejectMotif.split("\n").join("").split(" ").join(""))}
              >
                Rejeter
              </button>
            </div>
          </div>

        </div>
        {loading && (
            <Spinner/>
        )}
      </React.Fragment>
    );

  }

  /** End render*/
}

export default UploadDetails;

const Info = ({label, value}) => {

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (data) => {
    const textArea = document.createElement("textarea");
    textArea.value = data;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    if(document.execCommand) {
      document.execCommand('copy')
    } else {
      window.alert("unable to copy");
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = () => {
    copyToClipboard(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000)
  };

  return (
      <div className="flex flex-col items-start mb-6 w-full">
        <div className="text-base text-center font-bold capitalize mb-2">{label.toString().split("_").join(" ")}</div>
        <div className="flex flex-row w-10/12 justify-between w-full">
          <div className="text-sm truncate">{value}</div>
          {!copied && <svg onClick={handleCopy} className="hover:shadow-lg cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="14" height="18" rx="1" stroke="#494949" strokeWidth="2"/>
            <rect x="5" y="5" width="14" height="18" rx="1" fill="white" stroke="#494949" strokeWidth="2"/>
          </svg>}
          {copied && <div>Copié</div>}
        </div>
      </div>
  );
};

const SocialInput = ({onChange, label, socials}) => {

  return (
      <div className="flex flex-col items-start mb-6 w-full">
        <div className="text-md text-center font-semibold capitalize">{label}</div>
        <div className="flex flex-row w-10/12 justify-between w-full">
          <input
              value={socials[`share_link_${label.toString().toLowerCase()}`]}
              className="h-10 rounded w-full outline-none border-0 border-b text-sm"
              onChange={({target}) => onChange(`share_link_${label.toString().toLowerCase()}`, target.value)}
          />
        </div>
      </div>
  );
};
