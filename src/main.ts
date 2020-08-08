class iQl {
  // este archivo necesita axios
  query(data: JSON) {
    let query: String;
    if (data["data"]["get"]) {
      query = this.buildQueryComplex(data);
    } else {
      query = this.querySelect(data);
    }

    return query;
  }

  buildQueryComplex(data: JSON) {
    let query: String = "";
    let get = data["data"]["get"];
    let set = data["data"]["set"];
    let type = data["data"]["type"];
    let where = data['where'];

    switch (type) {
      case "update":
        query = `UPDATE ${data["table"]} SET ${this.queryUpdate(
          get,
          set
        )} WHERE ${where['data']} = '${where['value']}'`;
        break;
      case "add":
        query = `INSERT INTO ${data["table"]} ${this.queryAdd(get, set)}`;
        break;
    }

    return query;
  }

  queryUpdate(gettr, settr): String {
    var query: String = "";
    for (let index = 0; index < gettr.length; index++) {
      if (index == gettr.length - 1) {
        query = `${query} ${gettr[index]} = ${settr[index]}`;
      } else {
        query = `${query} ${gettr[index]} = ${settr[index]},`;
      }
    }
    return query;
  }

  queryAdd(gettr, settr) {
    let query: string = "";
    let values: String = "";
    for (let index = 0; index < gettr.length; index++) {
      if (index == gettr.length - 1) {
        query = `(${query} ${gettr[index]} )`;
        values = `(${values} '${settr[index]}' )`;
      } else {
        query = `${query} ${gettr[index]},`;
        values = `${values} '${settr[index]}',`;
      }
    }
    return `${query} VALUES ${values}`;
  }

  querySelect(data) {
    let query: String = "";
    let gettr = data["data"];
    let where = data['where']
    for (let index = 0; index < gettr.length; index++) {
      if (index == gettr.length - 1) {
        query = `${query} ${gettr[index]}`;
      } else {
        query = `${query} ${gettr[index]},`;
      }
    }
    
    return `SELECT ${query} FROM ${data["table"]} WHERE ${where['data']} = '${where['value']}'`;
  }
}
