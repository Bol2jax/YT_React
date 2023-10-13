import _ from 'lodash';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
const API_KEY = 'AIzaSyCYuL_tkMJq8V8qRCdnN2Lt_VLz0k3ySE8'; //change from time to time as it has limit usage of callbacks

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null
    
    };

    this.videoSearch('surfboards')

  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300); // with the use of debounce we stablish this function can be run only once every 300 miliseconds

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
