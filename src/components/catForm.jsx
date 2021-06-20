import React, { Component } from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { toast } from "react-toastify";
import * as yup from "yup";

import Input from "./common/input";
import { updateCat, addCat } from "../store/reducers/cat-reducer";

class CatForm extends Component {
  state = {
    data: {
      name: "",
      description: "",
      location: "",
      breed: "",
    },
    edit: false,
    errors: {},
  };

  schema = yup.object().shape({
    id: yup.string(),
    name: yup.string().min(3).required(),
    description: yup.string().min(3).required(),
    location: yup.string().min(3).required(),
    breed: yup.string().min(3).required(),
  });

  componentDidMount() {
    const cats = this.props.currentCat;
    if (cats) {
      this.setState({ data: cats });
      this.setState({ edit: true });
    }
  }

  validate = () => {
    try {
      this.schema.validateSync(this.state.data, { abortEarly: false });
    } catch (errors) {
      return errors.inner.reduce((prev, value) => {
        prev[value.path] = value.message;
        return prev;
      }, {});
    }
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    try {
      this.schema.validateSyncAt(name, obj);
    } catch (err) {
      if (err.message) return err.message;
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.onSubmit();
  };

  onSubmit = () => {
    if (this.props.currentCat) {
      this.props.updateCat({ ...this.state.data });
      toast.success("Cat Updated");
    } else {
      const id = shortid.generate();
      this.props.createCat({ id, ...this.state.data });
      toast.success("Cat saved");
    }

    this.props.history.push("/cats");
  };

  render() {
    const { data, edit, errors } = this.state;

    return (
      <div>
        {edit ? <h1>Edit Cat</h1> : <h1>New Cat</h1>}

        <form onSubmit={this.handleSubmit}>
          <Input name="name" label="Name" type="text" value={data.name} onChange={this.handleChange} error={errors["name"]} />
          <Input
            name="description"
            label="Description"
            type="text"
            value={data.description}
            onChange={this.handleChange}
            error={errors["description"]}
          />
          <Input name="breed" label="Breed" type="text" value={data.breed} onChange={this.handleChange} error={errors["breed"]} />
          <Input
            name="location"
            label="Location"
            type="text"
            value={data.location}
            onChange={this.handleChange}
            error={errors["location"]}
          />

          <button className="btn btn-primary" onClick={this.handleSubmit}>
            {edit ? "Update Cat" : "Create Cat"}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentCat: state.cats.find((x) => x.id === ownProps.match.params?.id),
  };
};

const mapDispatchToProps = (dispatch) => ({
  createCat: (cat) => dispatch(addCat(cat)),
  updateCat: (cat) => dispatch(updateCat(cat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatForm);
