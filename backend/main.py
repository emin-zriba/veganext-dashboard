import urllib3
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import logging
from requests.auth import HTTPBasicAuth
import json

# Disable insecure request warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = FastAPI()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

WAZUH_API_URL = 'https://45.56.79.95:55000'
WAZUH_USERNAME = 'wazuh-wui'
WAZUH_PASSWORD = 'PYNLrvq0NKqYOILtGg?XhYwMKmUPrN4+'

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TokenResponse(BaseModel):
    token: str

security = HTTPBasic()

def get_wazuh_token():
    auth_url = f"{WAZUH_API_URL}/security/user/authenticate?raw=true"
    response = requests.post(auth_url, auth=HTTPBasicAuth(WAZUH_USERNAME, WAZUH_PASSWORD), verify=False)
    if response.status_code == 200:
        logger.info("Authentication successful")
        return response.text
    else:
        logger.error(f"Authentication failed: {response.status_code} - {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Authentication failed")

@app.get("/agents")
def get_agents(status: str = 'active', token: str = Depends(get_wazuh_token)):
    headers = {'Authorization': f'Bearer {token}'}
    params = {'status': status}
    response = requests.get(f"{WAZUH_API_URL}/agents", headers=headers, params=params, verify=False)
    if response.status_code == 200:
        logger.info("Agents fetched successfully")
        return json.loads(response.text)
    else:
        logger.error(f"Failed to fetch agents: {response.status_code} - {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch agents")

@app.get("/agents/paginated")
def get_agents_paginated(limit: int = 100, offset: int = 0, token: str = Depends(get_wazuh_token)):
    headers = {'Authorization': f'Bearer {token}'}
    params = {'limit': limit, 'offset': offset, 'sort': '-dateAdd'}
    response = requests.get(f"{WAZUH_API_URL}/agents", headers=headers, params=params, verify=False)
    if response.status_code == 200:
        logger.info("Paginated agents fetched successfully")
        return response.json()
    else:
        logger.error(f"Failed to fetch paginated agents: {response.status_code} - {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch agents")

@app.get("/machines")
def get_machines(limit: int = 100, offset: int = 0, token: str = Depends(get_wazuh_token)):
    logger.info(f"Fetching machines with limit: {limit}, offset: {offset}")
    headers = {'Authorization': f'Bearer {token}'}
    params = {'limit': limit, 'offset': offset, 'sort': '-lastKeepAlive'}
    response = requests.get(f"{WAZUH_API_URL}/agents", headers=headers, params=params, verify=False)
    if response.status_code == 200:
        logger.info("Machines fetched successfully")
        machines = response.json().get('data', {}).get('affected_items', [])
        parsed_machines = [
            {
                'ip': machine.get('ip'),
                'hostname': machine.get('name'),
                'os': machine.get('os', {}).get('name'),
                'status': machine.get('status')
            }
            for machine in machines
        ]
        return parsed_machines
    else:
        logger.error(f"Failed to fetch machines: {response.status_code} - {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch machines")

@app.get("/logs")
def get_logs(limit: int = 100, offset: int = 0, token: str = Depends(get_wazuh_token)):
    logger.info(f"Fetching logs with limit: {limit}, offset: {offset}")
    headers = {'Authorization': f'Bearer {token}'}
    params = {'limit': limit, 'offset': offset}
    response = requests.get(f"{WAZUH_API_URL}/smanager/logs", headers=headers, params=params, verify=False)
    if response.status_code == 200:
        logger.info("Logs fetched successfully")
        return response.json()
    else:
        logger.error(f"Failed to fetch logs: {response.status_code} - {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch logs")

@app.get("/events/{agent_id}")
def get_events(agent_id: str, limit: int = 100, offset: int = 0, q: str = None, select: str = None, 
               sort: str = '-timestamp', search: str = None, token: str = Depends(get_wazuh_token)):
    logger.info(f"Fetching events for agent {agent_id} with limit: {limit}, offset: {offset}")
    headers = {'Authorization': f'Bearer {token}'}
    params = {
        'limit': limit,
        'offset': offset,
        'sort': sort
    }
    if q:
        params['q'] = q
    if select:
        params['select'] = select
    if search:
        params['search'] = search

    response = requests.get(f"{WAZUH_API_URL}/syscheck/{agent_id}/events", headers=headers, params=params, verify=False)
    if response.status_code == 200:
        logger.info("Events fetched successfully")
        return response.json()
    else:
        logger.error(f"Failed to fetch events: {response.status_code} - {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch events")

@app.get("/alerts/{agent_id}")
def get_alerts(agent_id: str, limit: int = 100, offset: int = 0, q: str = None, select: str = None, 
               sort: str = '-timestamp', search: str = None, token: str = Depends(get_wazuh_token)):
    logger.info(f"Fetching alerts for agent {agent_id} with limit: {limit}, offset: {offset}")
    headers = {'Authorization': f'Bearer {token}'}
    params = {
        'limit': limit,
        'offset': offset,
        'sort': sort
    }
    if q:
        params['q'] = q
    if select:
        params['select'] = select
    if search:
        params['search'] = search

    response = requests.get(f"{WAZUH_API_URL}/agents/{agent_id}/alerts", headers=headers, params=params, verify=False)
    if response.status_code == 200:
        logger.info("Alerts fetched successfully")
        return response.json()
    else:
        logger.error(f"Failed to fetch alerts: {response.status_code} - {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch alerts")

@app.get("/security_events")
def get_all_security_events(limit: int = 100, offset: int = 0, q: str = None, select: str = None, 
                            sort: str = '-timestamp', search: str = None, token: str = Depends(get_wazuh_token)):
    logger.info(f"Fetching security events for all agents with limit: {limit}, offset: {offset}")
    headers = {'Authorization': f'Bearer {token}'}

    # First, get a list of all agent IDs
    agents_response = requests.get(f"{WAZUH_API_URL}/agents", headers=headers, params={'select': 'id'}, verify=False)
    if agents_response.status_code != 200:
        logger.error(f"Failed to fetch agents: {agents_response.status_code} - {agents_response.text}")
        raise HTTPException(status_code=agents_response.status_code, detail="Failed to fetch agents")

    agent_ids = [agent['id'] for agent in agents_response.json()['data']['affected_items']]

    all_security_events = []
    for agent_id in agent_ids:
        params = {
            'limit': limit,
            'offset': offset,
            'sort': sort,
            'q': f'agent.id:{agent_id}' + (f';{q}' if q else ''),
        }
        if q:
            params['q'] += ';' + q
        if select:
            params['select'] = select
        if search:
            params['search'] = search

        response = requests.get(f"{WAZUH_API_URL}/agents/{agent_id}/alerts", headers=headers, params=params, verify=False)
        if response.status_code == 200:
            all_security_events.extend(response.json()['data']['affected_items'])
        else:
            logger.warning(f"Failed to fetch security events for agent {agent_id}: {response.status_code} - {response.text}")

    logger.info("All security events fetched successfully")
    return {"data": {"affected_items": all_security_events}}

@app.get("/incidents/{agent_id}")
def get_incidents(agent_id: str, limit: int = 100, offset: int = 0, min_level: int = 1, token: str = Depends(get_wazuh_token)):
    logger.info(f"Fetching incidents for agent {agent_id} with limit: {limit}, offset: {offset}, min_level: {min_level}")
    headers = {'Authorization': f'Bearer {token}'}
    params = {
        'limit': limit,
        'offset': offset,
        'sort': '-rule.level',
        'q': f'rule.level>={min_level}'
    }

    response = requests.get(f"{WAZUH_API_URL}/agents/{agent_id}/alerts", headers=headers, params=params, verify=False)
    if response.status_code == 200:
        logger.info("Incidents fetched successfully")
        return response.json()
    else:
        logger.error(f"Failed to fetch incidents: {response.status_code} - {response.text}")
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch incidents")