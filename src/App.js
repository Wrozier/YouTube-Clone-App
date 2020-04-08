import React from 'react';
//Grid is not a defualt exoprt
import {Grid} from '@material-ui/core';
//Youtube is
import {SearchBar , VideoDetail , VideoList }from './components';
import youtube from './api/youtube';




class App extends React.Component {
    state ={
        video:[],
        selectedVideo: null,

    }

    componentDidMount(){
        this.handleSubmit('pdf generation with react and node')

    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video});

    }
    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', { 
            params: {
                part: 'snippet',
                maxResults: 5,
                key: '557034374024-r819g0ecu977ig27l383i91lurqv3hh6',
                q: searchTerm,
            }
        });

        this.setState({ videos: response.data.items,
                        selectedVideos: response.data.items[0]
                    });
    }
    render (){
        const { selectedVideo, videos } = this.state;
        return(
            <Grid  justify="center" container spacing={10}>
                <Grid items xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                            <Grid item xs={8}>
                                <VideoDetail  video= {selectedVideo}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}


export default App;