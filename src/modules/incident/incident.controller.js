const { Incident, IncidentImage, Location, User } = require('../../models');

exports.createIncident = async (req, res) => {
  try {
    // Recebe os dados do body:
    // title, userId (opcional), location (objeto opcional com name, latitude e longitude),
    // e images (array de URLs)
    const { title, userId, location, images } = req.body;

    let locationRecord = null;
    if (location) {
      // Cria registro do local
      locationRecord = await Location.create({
        name: location.name,
        latitude: location.latitude, // pode ser null
        longitude: location.longitude // pode ser null
      });
    }

    // Cria o incidente (ocorrência)
    const incident = await Incident.create({
      title,
      userId: userId || null,
      locationId: locationRecord ? locationRecord.id : null
    });

    // Se houver imagens, associa-as ao incidente
    if (images && images.length > 0) {
      const imagesData = images.map(url => ({
        url,
        incidentId: incident.id
      }));
      await IncidentImage.bulkCreate(imagesData);
    }

    // Retorna o incidente criado com seus relacionamentos
    const createdIncident = await Incident.findOne({
      where: { id: incident.id },
      include: [
        { model: Location, as: 'location' },
        { model: IncidentImage, as: 'images' },
        { model: User, as: 'user' }
      ]
    });

    return res.status(201).json(createdIncident);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar o incidente' });
  }
};

exports.getAllIncidents = async (req, res) => {
  try {
    // Lista todas as ocorrências com os relacionamentos
    const incidents = await Incident.findAll({
      include: [
        { model: Location, as: 'location' },
        { model: IncidentImage, as: 'images' },
        { model: User, as: 'user' }
      ]
    });
    return res.status(200).json(incidents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar os incidentes' });
  }
};

exports.getIncidentById = async (req, res) => {
  try {
    const { id } = req.params;
    const incident = await Incident.findOne({
      where: { id },
      include: [
        { model: Location, as: 'location' },
        { model: IncidentImage, as: 'images' },
        { model: User, as: 'user' }
      ]
    });
    if (!incident) {
      return res.status(404).json({ error: 'Incidente não encontrado' });
    }
    return res.status(200).json(incident);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar o incidente' });
  }
};
