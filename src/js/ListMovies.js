import React from "react";

var ListMovies = React.createClass({
    getInitialState: function() {

        return {
            movieInfo : this.props.movieInfo,
            loaded : false
        }
    },

    render: function() {

        var movie = this.props.movieInfo;
        var movieName = movie.movieName;
        var movieGenre = movie.movieGenre;
        var movieYear = movie.movieYear;
        var movieDirector = movie.movieDirector;

        return (

                <div class="row">
                     <div class="col-sm-12 table-responsive" id="assettable">
                          <div class="RowValues">
                                <div class="col-md-5">{ movieName }</div>
                                <div class="col-md-2">{ movieDirector }</div>
                                <div class="col-md-1">{ movieYear }</div>
                                <div class="col-md-2">{ movieGenre }</div>
                                <div class="col-md-1">
                                    <a href="#" onClick={ this.handleDeleteClick }><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a>
                                </div>
                          </div>
                      </div>
                 </div>
            )
    },

    deleteMovieFromList : function()
    {
        this.props.refreshList();
        this.setState({
            loaded : true
        })
    },

    deleteMovie : function(_id){

        var _id = _id;
        var refreshFunc = this.props.refreshList;
        var deleteMovieFromList = this.deleteMovieFromList;
        setTimeout(function() {
            $.post('/deleteMovie',
                {
                    _id : _id
                }, function(result) {
                    if (result === 'OK') {
                        deleteMovieFromList();
                    } else {
                        alert(result)
                    }
                })
        }, 0)

    },

    handleDeleteClick : function(){

        var r = confirm("Are you sure you want to delete this movie?");
        var _id = this.props.movieInfo._id;
        var deleteMovie = this.deleteMovie;
           if (r == true) {
                deleteMovie(_id);
           } else {
               var x = "You pressed Cancel!";
           }
    }

    })


module.exports = ListMovies;
