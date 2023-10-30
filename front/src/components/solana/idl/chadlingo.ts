export type Chadlingo = {
  "version": "0.1.0",
  "name": "chadlingo",
  "instructions": [
    {
      "name": "create",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "challengeStake",
          "type": "u64"
        },
        {
          "name": "challengeLength",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "validate",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "counter",
            "type": "u64"
          },
          {
            "name": "challengeStake",
            "type": "u64"
          },
          {
            "name": "challengeStart",
            "type": "i64"
          },
          {
            "name": "challengeLength",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "DepositError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ErrorDeposit"
          }
        ]
      }
    },
    {
      "name": "ValidateError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ErrorValidate"
          }
        ]
      }
    },
    {
      "name": "WithdrawError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ErrorWithdraw"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ErrorCreate",
      "msg": ""
    }
  ]
};

export const IDL: Chadlingo = {
  "version": "0.1.0",
  "name": "chadlingo",
  "instructions": [
    {
      "name": "create",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "challengeStake",
          "type": "u64"
        },
        {
          "name": "challengeLength",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "validate",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "counter",
            "type": "u64"
          },
          {
            "name": "challengeStake",
            "type": "u64"
          },
          {
            "name": "challengeStart",
            "type": "i64"
          },
          {
            "name": "challengeLength",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "DepositError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ErrorDeposit"
          }
        ]
      }
    },
    {
      "name": "ValidateError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ErrorValidate"
          }
        ]
      }
    },
    {
      "name": "WithdrawError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "ErrorWithdraw"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ErrorCreate",
      "msg": ""
    }
  ]
};
