{
    "swagger": "2.0",
    "info": {
      "title": "Pink Elephant Creation APIs",
      "description": "API endpoints meant for customers to access products, as well as those authorized to access inventory, designs, and updating products.",
      "version": "1.0.0"
    },
    "host": [
      "cse341-project2-week8.herokuapp.com"
    ],
    "basePath": "/",
    "tags": [
      {
        "name": "Products",
        "description": "API endpoints for Products collection."
      },
      {
        "name": "Inventory",
        "description": "API endpoints for Inventory collection"
      },
      {
        "name": "Designs",
        "description": "API endpoints for Designs collection"
      }
    ],
    "schemes": [
      "https",
      "http"
    ],
    "paths": {
      "/api-docs": {
        "get": {
          "description": "",
          "parameters": [],
          "responses": {}
        }
      },
      "/products": {
        "get": {
          "tags": [
            "Products"
          ],
          "description": "Get all product items in collection",
          "parameters": [],
          "responses": {
            "200": {
              "description": "OK"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "post": {
          "tags": [
            "Products"
          ],
          "description": "Create a product item in the product collection",
          "parameters": [
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "example": "any"
                  },
                  "description": {
                    "example": "any"
                  },
                  "category": {
                    "example": "any"
                  },
                  "type": {
                    "example": "any"
                  },
                  "size": {
                    "example": "any"
                  },
                  "color": {
                    "example": "any"
                  },
                  "price": {
                    "example": "any"
                  }
                }
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Created"
            },
            "400": {
              "description": "Bad Request"
            }
          }
        }
      },
      "/products/{id}": {
        "get": {
          "tags": [
            "Products"
          ],
          "description": "Get one product in collection using an ID.",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "delete": {
          "tags": [
            "Products"
          ],
          "description": "Delete one product in the collection using an ID.",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "put": {
          "tags": [
            "Products"
          ],
          "description": "Update exisiting Product in the database using ID to locate that Product",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            },
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "example": "any"
                  },
                  "description": {
                    "example": "any"
                  },
                  "category": {
                    "example": "any"
                  },
                  "type": {
                    "example": "any"
                  },
                  "size": {
                    "example": "any"
                  },
                  "color": {
                    "example": "any"
                  },
                  "price": {
                    "example": "any"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/inventory": {
        "get": {
          "tags": [
            "Inventory"
          ],
          "description": "Get all inventory items in collection",
          "parameters": [],
          "responses": {
            "200": {
              "description": "OK"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "post": {
          "tags": [
            "Inventory"
          ],
          "description": "Create an inventory item in collection",
          "parameters": [
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "category": {
                    "example": "any"
                  },
                  "type": {
                    "example": "any"
                  },
                  "size": {
                    "example": "any"
                  },
                  "color": {
                    "example": "any"
                  },
                  "quantity": {
                    "example": "any"
                  }
                }
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Created"
            },
            "400": {
              "description": "Bad Request"
            }
          }
        }
      },
      "/inventory/{id}": {
        "get": {
          "tags": [
            "Inventory"
          ],
          "description": "Get inventory item in collection",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "delete": {
          "tags": [
            "Inventory"
          ],
          "description": "Delete an inventory item in collection",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "put": {
          "tags": [
            "Inventory"
          ],
          "description": "Update a single inventory item using an ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            },
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "category": {
                    "example": "any"
                  },
                  "type": {
                    "example": "any"
                  },
                  "size": {
                    "example": "any"
                  },
                  "color": {
                    "example": "any"
                  },
                  "quantity": {
                    "example": "any"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/designs": {
        "get": {
          "tags": [
            "Designs"
          ],
          "description": "Get all designs in collection",
          "parameters": [],
          "responses": {
            "200": {
              "description": "OK"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "post": {
          "tags": [
            "Designs"
          ],
          "description": "Create design item and save in design collection",
          "parameters": [
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "example": "any"
                  },
                  "material": {
                    "example": "any"
                  },
                  "price": {
                    "example": "any"
                  }
                }
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Created"
            },
            "400": {
              "description": "Bad Request"
            }
          }
        }
      },
      "/designs/{id}": {
        "get": {
          "tags": [
            "Designs"
          ],
          "description": "Get one design in collection using an ID.",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "delete": {
          "tags": [
            "Designs"
          ],
          "description": "Delete one design in the collection using an ID.",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "put": {
          "tags": [
            "Designs"
          ],
          "description": "Update exisiting contact in the database using ID to locate that contact.",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
            },
            {
              "name": "body",
              "in": "body",
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "example": "any"
                  },
                  "material": {
                    "example": "any"
                  },
                  "price": {
                    "example": "any"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      }
    }
  }