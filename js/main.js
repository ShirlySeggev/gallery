'use strict';

// function initPage() {
//     renderProjects();
//     renderModals();
// }

$(document).ready(function() {
    renderProjects();
    renderModals();
    $('.offcanvas-btn').click(openCanvas);
    $('.my-form').submit(onContact);
})

function renderProjects() {
    var projs = getProjectsToDisplay();
    var cardHtml = projs.map(function(proj) {
        return `  
                <div class="col-md-4 col-sm-6 portfolio-item">
                    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${projs.indexOf(proj) + 1}">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-plus fa-3x"></i>
                            </div>
                        </div>
                        <img class="img-fluid" src="img/portfolio/${proj.id}.JPG" alt="" style="height:300px;width:100%;object-fit:cover;">
                        </a>
                        <div class="portfolio-caption">
                        <h4>${proj.name}</h4>
                        <p class="text-muted">${proj.title}</p>
                        </div>
                        </div>
                        `;
    });
    $('.project-container').html(cardHtml);
    // var elPorfolio = document.querySelector('.project-container');
    // elPorfolio.innerHTML = cardHtml.join('');
}

function renderModals() {
    var projs = getProjectsToDisplay();
    var modalHtml = projs.map(function(proj) {
        return `  
        <div class="portfolio-modal modal fade" id="portfolioModal${projs.indexOf(proj) + 1}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">${proj.title}</p>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.JPG" alt="" style="height:500px;width:500px;object-fit:cover;">
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                      <li>Date: ${proj.publishedAt}</li>
                      <li>Client: ${proj.client}</li>
                      <li>Category: ${proj.labels}</li>
                      <li><a href="projects/${proj.id}/index.html">Try it!</a></li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i>
                      Close Project</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
                `;
    });
    $('.modals-container').html(modalHtml);
    // var elContainer = document.querySelector('.modals-container');
    // elContainer.innerHTML = modalHtml.join('');
}


function onContact(ev) {
    ev.preventDefault();
    var sendTo = 'shirlyarcusin@gmail.com';
    // var subject = document.querySelector('#subject').value;
    var subject = $('#subject').val();
    // var body = document.querySelector('#textarea').value;
    var body = $('#textarea').val();

    var url = `https://mail.google.com/mail/?view=cm&fs=1&to=${sendTo}&su=${subject}&body=${body}`;
    window.open(url);
}