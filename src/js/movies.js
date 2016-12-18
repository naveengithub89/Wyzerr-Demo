import React from "react"
import AddMovie from "./AddMovie";
import ListMovies from "./ListMovies";

var Movies = React.createClass({

    getInitialState: function() {

        return {
            Movies: [],
            loaded: false,
            showSection : 0
        }
    },

    componentDidMount: function() {

        setTimeout(this.readMovies, 0);
    },

    readMovies: function() {


        $.ajax({
            url: '/readMovies',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    Movies: data.movies,
                    loaded: true

                })
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.apiServer, status, err.toString())
            }.bind(this)
        })


    },

    render: function() {

        var apiServer = this.props.apiServer;
        var read = this.readMovies;


        if (this.state.loaded) {

            return (

             <div class="container-fluid">

                   <div class="dashsection col-sm-12">
                     <div class="container-fluid" id="wrappy">
                       <div class="row" id="header">
                         <div><br></br></div>
                         <div class="col-sm-12">
                           <ul class="breadcrumb">
                             <li><a href="/">HOME</a></li>
                             <li><a class="active" href="/managemovies">MOVIE LIST</a></li>
                           </ul>
                         </div>
                       </div>

                       <AddMovie refreshList = {read} showSection={this.state.showSection} apiServer={apiServer}/>

                       <div class="row">
                             <div class="col-sm-12 table-responsive" id="assettable">
                                 <div class="Heading">
                                   <div class="col-md-5">NAME</div>
                                   <div class="col-md-2">DIRECTOR</div>
                                   <div class="col-md-1">YEAR</div>
                                   <div class="col-md-2">GENRE</div>
                                   <div class="col-md-1">DELETE</div>
                                 </div>
                             </div>
                        </div>
                        <div class="row">
                            { this.state.Movies.map(function(result) {
                                 return <ListMovies key={ result._id } movieInfo={ result } refreshList = {read}/>
                               })
                            }
                        </div>


                     </div>
                   </div>

             </div>


            )
        } else {
            return (<div>Loading Movie information...</div>)
        }
    }
})

module.exports = Movies;
