import React from 'react';
import PreviewDropzone from './Dropzone.jsx';
import PublishTitleInput from './PublishTitleInput.jsx';
import ChannelSelector from '../components/ChannelSelector.jsx';
import PublishUrlInput from './PublishUrlInput.jsx';
import PublishThumbnailInput from './PublishThumbnailInput.jsx';
import PublishMetadataInputs from './PublishMetadataInputs.jsx';
import AnonymousOrChannelSelect from './AnonymousOrChannelSelect.jsx';
import { connect } from 'react-redux';
import { getCookie } from '../utils/cookies.js';
import { selectFile, clearFile, updateLoggedInChannel, updatePublishStatus } from '../actions';

class PublishForm extends React.Component {
  constructor (props) {
    super(props);
    // set defaults
    this.state = {
      publishRequestError: null,
    };
    this.validatePublishRequest = this.validatePublishRequest.bind(this);
    this.makePublishRequest = this.makePublishRequest.bind(this);
    this.publish = this.publish.bind(this);
  }
  componentWillMount () {
    // check for whether a channel is already logged in
    const loggedInChannelName = getCookie('channel_name');
    const loggedInChannelShortId = getCookie('short_channel_id');
    const loggedInChannelLongId = getCookie('long_channel_id');
    console.log(`channel cookies found: ${loggedInChannelName} ${loggedInChannelShortId} ${loggedInChannelLongId}`);
    this.props.onChannelLogin(loggedInChannelName, loggedInChannelShortId, loggedInChannelLongId);
  }
  validatePublishRequest () {
    // make sure all required data is provided
    return new Promise((resolve, reject) => {
      // is there a file?
      if (!this.props.file) {
        return reject(new Error('Please choose a file'));
      }
      // is there a claim chosen?
      if (!this.props.claim) {
        return reject(new Error('Please enter a claim name'));
      }
      // if publishInChannel is true, is a channel logged in (or selected)
      if (this.props.publishInChannel && !this.props.loggedInChannel.name) {
        return reject(new Error('Select Anonymous or log in to a channel'));
      }
      // tbd: is the claim available?
      resolve();
    });
  }
  makePublishRequest (file, metadata) {
    const uri = '/api/claim-publish';
    const xhr = new XMLHttpRequest();
    const fd = this.appendDataToFormData(file, metadata);
    const that = this;
    xhr.upload.addEventListener('loadstart', function () {
      that.props.onPublishStatusChange('upload started');
    });
    xhr.upload.addEventListener('progress', function (e) {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded * 100) / e.total);
        that.props.onPublishStatusChange(`upload progress: ${percentage}%`);
        console.log('progress:', percentage);
      }
    }, false);
    xhr.upload.addEventListener('load', function () {
      console.log('loaded 100%');
      that.props.onPublishStatusChange(`Upload complete.  Your file is now being published on the blockchain...`);
    }, false);
    xhr.open('POST', uri, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log('publish response:', xhr.response);
        if (xhr.status === 200) {
          console.log('publish complete!');
          that.props.onPublishStatusChange(JSON.parse(xhr.response).message);
        } else if (xhr.status === 502) {
          that.props.onPublishStatusChange('Spee.ch was not able to get a response from the LBRY network.');
        } else {
          that.props.onPublishStatusChange(JSON.parse(xhr.response).message);
        }
      }
    };
    // Initiate a multipart/form-data upload
    xhr.send(fd);
  }
  createMetadata () {
    let metadata = {
      name       : this.props.claim,
      title      : this.props.title,
      description: this.props.description,
      license    : this.props.license,
      nsfw       : this.props.nsfw,
      type       : this.props.file.type,
      thumbnail  : this.props.thumbnail,
    };
    if (this.props.publishInChannel) {
      metadata['channelName'] = this.props.loggedInChannel.name;
    }
    return metadata;
  }
  appendDataToFormData (file, metadata) {
    var fd = new FormData();
    fd.append('file', file);
    for (var key in metadata) {
      if (metadata.hasOwnProperty(key)) {
        console.log(key, metadata[key]);
        fd.append(key, metadata[key]);
      }
    }
    return fd;
  }
  publish () {
    // publish the asset
    const that = this;
    this.validatePublishRequest()
      .then(() => {
        const metadata = that.createMetadata();
        // publish the claim
        return that.makePublishRequest(this.props.file, metadata);
      })
      .then(() => {
        that.props.onPublishStatusChange('publish request made');
      })
      .catch((error) => {
        that.setState({publishRequestError: error.message});
      });
  }
  render () {
    return (
      <div className="row row--no-bottom">
        <div className="column column--10">

          <PublishTitleInput />

        </div>
        <div className="column column--5 column--sml-10" >

          <div className="row row--padded">
            <PreviewDropzone />
          </div>

        </div>
        <div className="column column--5 column--sml-10 align-content-top">
          <div id="publish-active-area" className="row row--padded">

            <div className="row row--padded row--no-top row--wide">
              <PublishUrlInput />
            </div>

            <div className="row row--padded row--no-top row--no-bottom row--wide">
              <AnonymousOrChannelSelect />
            </div>

            <div className="row row--padded row--no-top row--wide">
              <ChannelSelector />
            </div>

            { (this.props.file.type === 'video/mp4') && (
              <div className="row row--padded row--wide row--no-top">
                <PublishThumbnailInput />
              </div>
            )}

            <div className="row row--padded row--no-top row--no-bottom row--wide">
              <PublishMetadataInputs />
            </div>

            <div className="row row--padded row--wide">
              <div className="input-error" id="input-error-publish-submit" hidden="true">{this.state.publishRequestError}</div>
              <button id="publish-submit" className="button--primary button--large" onClick={this.publish}>Publish</button>
            </div>

            <div className="row row--short align-content-center">
              <button className="button--cancel" onClick={this.props.onFileClear}>Cancel</button>
            </div>

            <div className="row row--short align-content-center">
              <p className="fine-print">By clicking 'Upload', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. <a className="link--primary" target="_blank" href="https://lbry.io/learn">Read more.</a></p>
            </div>

          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    file            : state.file,
    claim           : state.claim,
    title           : state.metadata.title,
    thumbnail       : state.metadata.thumbnail,
    description     : state.metadata.description,
    license         : state.metadata.license,
    nsfw            : state.metadata.nsfw,
    loggedInChannel : state.loggedInChannel,
    publishInChannel: state.publishInChannel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFileSelect: (file) => {
      dispatch(selectFile(file));
    },
    onFileClear: () => {
      dispatch(clearFile());
    },
    onChannelLogin: (name, shortId, longId) => {
      dispatch(updateLoggedInChannel(name, shortId, longId));
    },
    onPublishStatusChange: (status) => {
      dispatch(updatePublishStatus(status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishForm);
