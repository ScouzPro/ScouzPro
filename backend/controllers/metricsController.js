import playerMetricModel from '../models/metricModel.js';

export const getPlayerMetrics = async (req, res) => {
    try {
        // Consulta todos los documentos de playerMetricModel en la base de datos
        const playerMetrics = await playerMetricModel.find();

        // Si no se encuentran documentos, responde con un mensaje de error
        if (!playerMetrics || playerMetrics.length === 0) {
            return res.status(404).json({ message: 'No se encontraron datos de métricas de jugadores.' });
        }

        // Si se encuentran documentos, responde con los documentos recuperados
        res.status(200).json(playerMetrics);
    } catch (error) {
        // Si ocurre un error durante la consulta, responde con un mensaje de error
        console.error('Error al obtener métricas de jugadores:', error);
        res.status(500).json({ message: 'Error del servidor al obtener métricas de jugadores.' });
    }
};



export const savePlayerMetrics = async(req, res) =>{
    try {
      // Crear una nueva instancia del modelo con los datos del cuerpo de la solicitud
      const newPlayerMetric = new playerMetricModel(req.body);
  
      // Guardar la nueva instancia en la base de datos
      const savedPlayerMetric = await newPlayerMetric.save();
  
      // Responder con el objeto guardado y el código de estado 201 (Created)
      res.status(201).json(savedPlayerMetric);
    } catch (error) {
      // Manejar errores y responder con el código de estado 400 (Bad Request)
      res.status(400).json({ message: error.message });
    }
  }

  export const getPlayerMetricById = async (req, res) => {
    const { id } = req.params;

    try {
        // Busca la métrica de jugador por el ID proporcionado
        // const playerMetric = await playerMetricModel.findById(id);
        const playerMetric = await playerMetricModel.find({ player_id: id });   

        // Si no se encuentra la métrica de jugador, responde con un mensaje de error
        if (!playerMetric) {
            return res.status(404).json({ message: 'No se encontró la métrica de jugador.' });
        }

        // Responde con la métrica de jugador encontrada y el código de estado 200 (OK)
        res.status(200).json(playerMetric);
    } catch (error) {
        // Si ocurre un error durante la búsqueda, responde con un mensaje de error
        console.error('Error al obtener la métrica de jugador por ID:', error);
        res.status(500).json({ message: 'Error del servidor al obtener la métrica de jugador por ID.' });
    }
};

  export const updatePlayerMetric = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        // Encuentra y actualiza el documento con el ID proporcionado
        const updatedPlayerMetric = await playerMetricModel.findByIdAndUpdate(id, body, { new: true });

        // Si no se encuentra el documento, responde con un mensaje de error
        if (!updatedPlayerMetric) {
            return res.status(404).json({ message: 'No se encontró la métrica de jugador para actualizar.' });
        }

        // Responde con el documento actualizado y el código de estado 200 (OK)
        res.status(200).json(updatedPlayerMetric);
    } catch (error) {
        // Si ocurre un error durante la actualización, responde con un mensaje de error
        console.error('Error al actualizar la métrica de jugador:', error);
        res.status(500).json({ message: 'Error del servidor al actualizar la métrica de jugador.' });
    }
};

export const deletePlayerMetric = async (req, res) => {
    const { id } = req.params;

    try {
        // Elimina el documento con el ID proporcionado
        const deletedPlayerMetric = await playerMetricModel.findByIdAndDelete(id);

        // Si no se encuentra el documento, responde con un mensaje de error
        if (!deletedPlayerMetric) {
            return res.status(404).json({ message: 'No se encontró la métrica de jugador para eliminar.' });
        }

        // Responde con el documento eliminado y el código de estado 200 (OK)
        res.status(200).json(deletedPlayerMetric);
    } catch (error) {
        // Si ocurre un error durante la eliminación, responde con un mensaje de error
        console.error('Error al eliminar la métrica de jugador:', error);
        res.status(500).json({ message: 'Error del servidor al eliminar la métrica de jugador.' });
    }
};
