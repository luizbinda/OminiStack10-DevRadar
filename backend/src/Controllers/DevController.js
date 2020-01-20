import axios from 'axios';
import Dev from '../models/Dev';

module.exports = {

  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const {
      gitUser,
      techs,
      latitude,
      longitude,
    } = request.body;

    let dev = await Dev.findOne({ gitUser });

    if (!dev) {
      const res = await axios.get(`https://api.github.com/users/${gitUser}`);

      const { name = login, avatar_url, bio } = res.data;

      const techsArry = techs.split(',').map((tech) => tech.trim());

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        nome: name,
        git_user: gitUser,
        biografia: bio,
        avatar_url,
        techs: techsArry,
        location,
      });
    }

    return response.json(dev);
  },
};
