requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min',
    Handlebars: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.12/handlebars.min',
    Task: 'data.task.umd.min',
    axios: 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min'
  }
});

require(
  [
    'ramda',
    'Handlebars',
    'Task',
    'axios'
  ],
  function (_, Handlebars, Task, axios) {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    const template = document.getElementById('template').innerHTML;
    
    const getJSON = params => {
      return new Task((reject, resolve) => {
        axios(params).then(response => resolve(response.data)).catch(reject);
      });
    };

    const renderPosts = Handlebars.compile(template);

    const mapPosts = _.compose(renderPosts, _.objOf('posts'));
    
    const app = _.compose(_.map(mapPosts), getJSON);

    app({ url: API_URL }).fork(
      err => console.log(err),
      html => {
        const container = document.getElementById('container');
        container.innerHTML = html;
      }
    );
  }
);
