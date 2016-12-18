import React from "react";
var ReactDOM = require('react-dom');

var AddMovie = React.createClass({

  getInitialState: function() {

        return {
                    showSection : 0,
                    movieName : '',
                    movieYear : '',
                    movieDirector : '',
                    movieGenre : 'Romance',
                    loaded : false
               }
    },

    handleAddMovieClick : function() {
      this.setState({
            showSection: 1
        })
    },

    //This is a regex function to handle only numeric digits in Year
    yearCheck(e) {
        const re = /^\d*$/;
        if (!re.test(e.key)) {
          e.preventDefault();
        }
    },

    updateNewMovieName : function(e){
        this.setState({
            movieName : e.target.value
        })
    },

    handleDropdownChange : function(e){
        this.setState({
             movieGenre : e.target.value
        })
    },
    updateYear : function(e){

        this.setState({
            movieYear : e.target.value
        })
    },

    updateDirectorName : function(e){
        this.setState({
            movieDirector : e.target.value
        })
    },

    handleCancel : function(){
       this.setState({
             showSection : 0
        })
    },

    //This function calls the refresh function that has been passed as props to this.
    refreshFunction : function(){

        this.props.refreshList();
        this.setState({
            showSection : 0
        })
    },

    handleSubmit : function(){

        var movieName = this.state.movieName.trim();
        var movieGenre = this.state.movieGenre.trim();
        var movieYear = this.state.movieYear.trim();
        var movieDirector = this.state.movieDirector.trim();


        if (movieName!='' && movieYear!='' && movieDirector!='')
        {
            var inputDoc={};
            inputDoc.movieName=movieName;
            inputDoc.movieGenre=movieGenre;
            inputDoc.movieYear=movieYear;
            inputDoc.movieDirector=movieDirector;
            var refreshFunction = this.refreshFunction;

            $.post({
                        url: '/addMovie',
                        dataType: 'json',
                        async: true,
                        cache: false,
                        data: { inputDoc : inputDoc },
                        success: function(data) {
                            this.setState({
                                showSection :0
                            })
                            refreshFunction();
                        }.bind(this),


                        error: function(xhr, status, err) {
                            console.error(this.props.apiServer, status, err.toString())
                        }.bind(this)
                    })

        }

        else
        {
            $('#errorMessage').html('All fields are mandatory');
            this.setState({
                  showSection : 1
              })
        }
    },

    render: function() {

    if (this.state.showSection === 0){

        return (
                  <div class="col-sm-12">
                     <div class="col-sm-12" id="addevent">
                        <input type="button" class="btn btn-info" value="ADD MOVIE" onClick={ this.handleAddMovieClick } ></input>
                     </div>
                  </div>
            )
        }

        else {
               if (this.state.showSection === 1)
               {

              return(

                 <form>
                       <div id="errorMessage"></div>
                       <div><br></br></div>
                       <div class="form-group">
                         <label for="movieName">Movie Name</label>
                         <input type="text" class="form-control" id="movieName" placeholder="Enter Movie Name" onChange={ this.updateNewMovieName }></input>
                       </div>
                       <div class="form-group">
                         <label for="directorName">Director Name</label>
                         <input type="text" class="form-control" id="directorName" placeholder="Enter Director Name" onChange={this.updateDirectorName}></input>
                       </div>
                       <div class="form-group">
                         <label for="movieYear">Year</label>
                         <input type="text" class="form-control" onKeyPress={(e) => this.yearCheck(e)} id="movieYear" placeholder="Year of Release" onChange={this.updateYear}></input>
                       </div>
                       <div class="form-group">
                         <label for="genre">Genre</label>
                         <select class="form-control" id="movieGenre" onChange={this.handleDropdownChange} value={this.state.movieGenre}>
                           <option value="Romance">Romance</option>
                           <option value="Thriller">Thriller</option>
                           <option value="Action">Action</option>
                           <option value="Comedy">Comedy</option>
                           <option value="Crime">Crime</option>
                         </select>
                       </div>
                       <div>
                        <button class="col-md-1 btn btn-default" onClick={this.handleSubmit}>Submit</button>
                        <button class="col-md-1 btn btn-default" onClick={this.handleCancel}>Cancel</button>
                       </div>
                  </form>
                )
              }
            }
        }
})

module.exports = AddMovie;
