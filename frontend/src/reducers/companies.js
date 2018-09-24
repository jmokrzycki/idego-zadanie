let companies = [];

let company = {
  name: "",
  address: "",
  nip: "",
  regon: "",
  phoneNumber: "",
  email: ""
};

let initialState = {
  company,
  companies
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case "SET_COMPANIES":
      return {
        ...state,
        companies: action.companies
      };
    case "UPDATE_COMPANY_FORM":
      return {
        ...state,
        company: {
          ...state.company,
          [action.key]: action.value
        }
      };
    case "ADD_COMPANY":
      return {
        ...state,
        companies: [...state.companies, action.company]
      };
    default:
      return state;
  }
}
