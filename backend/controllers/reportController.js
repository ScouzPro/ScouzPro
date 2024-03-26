import Report from "../models/reportModel.js";

const createReport = async (req, res) => {
    try {
        const newReport = new Report(req.body);
        const savedReport = await newReport.save();
        res.status(201).send(savedReport);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find({});
        res.status(200).send(reports);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateReport = async (req, res) => {
    try {
        const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(updatedReport);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteReport = async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).send(error);
    }
};

export { createReport, getAllReports, updateReport, deleteReport };