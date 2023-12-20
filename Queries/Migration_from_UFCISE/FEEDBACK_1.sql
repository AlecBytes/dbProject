--------------------------------------------------------
--  DDL for Table FEEDBACK
--------------------------------------------------------

  CREATE TABLE "FEEDBACK" 
   (	"FEEDBACK_ID" NUMBER, 
	"EMAIL" VARCHAR2(255 BYTE), 
	"NAME" VARCHAR2(255 BYTE), 
	"QUERY1" NUMBER(1,0), 
	"QUERY2" NUMBER(1,0), 
	"QUERY3" NUMBER(1,0), 
	"QUERY4" NUMBER(1,0), 
	"QUERY5" NUMBER(1,0), 
	"FEEDBACK" CLOB
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" 
 LOB ("FEEDBACK") STORE AS SECUREFILE (
  TABLESPACE "DATA" ENABLE STORAGE IN ROW CHUNK 8192
  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES 
  STORAGE(INITIAL 106496 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)) ;
