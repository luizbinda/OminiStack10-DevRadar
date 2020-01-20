import Dev from '../models/Dev';

module.exports = {

  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    const techsArry = techs.split(',').map((tech) => tech.trim());

    const devs = await Dev.find({
      techs: {
        $in: techsArry,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json(devs);
  },

};
