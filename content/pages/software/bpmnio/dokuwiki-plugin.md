---
published: true
path: "/software/bpmnio/dokuwiki-plugin"
date: "2019-01-07"
title: "BPMN plugin dokuwiki"
tags: ["software", "foss", "dokuwiki", "bpmn", "TODO_cleanup"]
---

# BPMN IO plugin for Dokuwiki

See https://www.dokuwiki.org/plugin:bpmnio

## Example

```xml
<bpmnio>
<semantic:definitions name="OrderProcessForPizza"
   targetNamespace="http://www.arost.com/bpmn/pizza"
   xmlns:arost="http://www.arost.com/bpmn/extension"
   xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
   xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
   xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
   xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <semantic:import importType="http://www.w3.org/2001/XMLSchema"
      location="http://www.arost.com/bpmn/BpmnArostSchema.xsd" namespace="http://www.arost.com/bpmn/extension"/>
   <semantic:process id="Pool1000" isExecutable="true"/>
   <semantic:process id="Pool1001" isExecutable="true">
      <semantic:manualTask
         arost:uid="cb926453-06b5-41a9-879d-0057c669f66c"
         completionQuantity="1" id="Step1002" isForCompensation="false"
         name="Ask for pizza" startQuantity="1">
         <semantic:incoming>Transition1021</semantic:incoming>
         <semantic:incoming>Transition1008</semantic:incoming>
         <semantic:outgoing>Transition1020</semantic:outgoing>
         <semantic:outgoing>Transition1003</semantic:outgoing>
      </semantic:manualTask>
      <semantic:manualTask
         arost:uid="918efc2f-11f8-455b-8aa5-bdc655aed378"
         completionQuantity="1" id="Step1014" isForCompensation="false"
         name="Pay the pizza" startQuantity="1">
         <semantic:incoming>Transition1004</semantic:incoming>
         <semantic:outgoing>Transition1016</semantic:outgoing>
         <semantic:outgoing>Transition1005</semantic:outgoing>
      </semantic:manualTask>
      <semantic:manualTask
         arost:uid="f5742b66-880d-4e16-a9f2-1611158ffb84"
         completionQuantity="1" id="Step1015" isForCompensation="false"
         name="Eat the pizza" startQuantity="1">
         <semantic:incoming>Transition1005</semantic:incoming>
         <semantic:outgoing>Transition1006</semantic:outgoing>
      </semantic:manualTask>
      <semantic:manualTask
         arost:uid="89b06a2c-5b27-4fe3-95dc-38bd0e03e238"
         completionQuantity="1" id="Step1001" isForCompensation="false"
         name="Select a pizza" startQuantity="1">
         <semantic:incoming>Transition1000</semantic:incoming>
         <semantic:outgoing>Transition1009</semantic:outgoing>
         <semantic:outgoing>Transition1001</semantic:outgoing>
      </semantic:manualTask>
      <semantic:eventBasedGateway
         arost:uid="6c75caea-edc8-4981-bee6-4bf8106b81f5"
         eventGatewayType="Exclusive" id="Step1006" instantiate="false" name="">
         <semantic:incoming>Transition1003</semantic:incoming>
         <semantic:incoming>Transition1001</semantic:incoming>
         <semantic:outgoing>Transition1007</semantic:outgoing>
         <semantic:outgoing>Transition1002</semantic:outgoing>
      </semantic:eventBasedGateway>
      <semantic:startEvent
         arost:uid="47643dd0-d28a-4850-9694-19f4cedcd884" id="Step1000"
         isInterrupting="true" name="Hungry for pizza" parallelMultiple="false">
         <semantic:outgoing>Transition1000</semantic:outgoing>
      </semantic:startEvent>
      <semantic:endEvent
         arost:uid="1267ec95-bf79-4367-9d80-8b40acbe599c" id="Step1016" name="Hunger satisfied">
         <semantic:incoming>Transition1006</semantic:incoming>
      </semantic:endEvent>
      <semantic:intermediateCatchEvent
         arost:uid="aee86817-728c-4550-999a-2ae8a179ac18" id="Step1012"
         name="60 minutes" parallelMultiple="false">
         <semantic:incoming>Transition1007</semantic:incoming>
         <semantic:outgoing>Transition1008</semantic:outgoing>
         <semantic:timerEventDefinition/>
      </semantic:intermediateCatchEvent>
      <semantic:intermediateCatchEvent
         arost:uid="b485c9ab-7cc2-47bf-9748-0ee14687ced3" id="Step1013"
         name="Pizza received" parallelMultiple="false">
         <semantic:incoming>Transition1017</semantic:incoming>
         <semantic:incoming>Transition1002</semantic:incoming>
         <semantic:outgoing>Transition1004</semantic:outgoing>
         <semantic:messageEventDefinition/>
      </semantic:intermediateCatchEvent>
      <semantic:sequenceFlow
         arost:uid="fb68f437-19b2-41ab-a606-7edbfd085cb1"
         associationDirection="None" id="Transition1000" name=""
         sourceRef="Step1000" targetRef="Step1001"/>
      <semantic:sequenceFlow
         arost:uid="7d7198c1-6c3c-40a0-ad30-42d5c5b181b1"
         associationDirection="None" id="Transition1001" name=""
         sourceRef="Step1001" targetRef="Step1006"/>
      <semantic:sequenceFlow
         arost:uid="874c58c8-7430-4fbf-8e55-b2f8b0c0418a"
         associationDirection="None" id="Transition1002" name=""
         sourceRef="Step1006" targetRef="Step1013"/>
      <semantic:sequenceFlow
         arost:uid="dcf127ef-2c7c-40e9-b826-41fd2f2102c4"
         associationDirection="None" id="Transition1003" name=""
         sourceRef="Step1002" targetRef="Step1006"/>
      <semantic:sequenceFlow
         arost:uid="e3bdf995-189e-40f2-9571-0ef55afafbd9"
         associationDirection="None" id="Transition1004" name=""
         sourceRef="Step1013" targetRef="Step1014"/>
      <semantic:sequenceFlow
         arost:uid="8cee0613-2779-4392-a3d8-131aaadcd8b4"
         associationDirection="None" id="Transition1005" name=""
         sourceRef="Step1014" targetRef="Step1015"/>
      <semantic:sequenceFlow
         arost:uid="4c993939-5e7b-4e7f-8abb-08b4f2f46ef0"
         associationDirection="None" id="Transition1006" name=""
         sourceRef="Step1015" targetRef="Step1016"/>
      <semantic:sequenceFlow
         arost:uid="013de820-fea9-471a-a722-446c22e85cea"
         associationDirection="None" id="Transition1007" name=""
         sourceRef="Step1006" targetRef="Step1012"/>
      <semantic:sequenceFlow
         arost:uid="e5ab36ee-1f93-4d88-9188-8ad96dfad028"
         associationDirection="None" id="Transition1008" name=""
         sourceRef="Step1012" targetRef="Step1002"/>
   </semantic:process>
   <semantic:process id="Pool1002" isExecutable="true">
      <semantic:laneSet id="LSPool1002">
         <semantic:lane id="Lane1002" name="clerk">
            <semantic:flowNodeRef>Step1003</semantic:flowNodeRef>
            <semantic:flowNodeRef>Step1004</semantic:flowNodeRef>
            <semantic:flowNodeRef>Step1007</semantic:flowNodeRef>
            <semantic:flowNodeRef>Step1008</semantic:flowNodeRef>
         </semantic:lane>
         <semantic:lane id="Lane1000" name="pizza chef">
            <semantic:flowNodeRef>Step1005</semantic:flowNodeRef>
         </semantic:lane>
         <semantic:lane id="Lane1001" name="delivery boy">
            <semantic:flowNodeRef>Step1009</semantic:flowNodeRef>
            <semantic:flowNodeRef>Step1010</semantic:flowNodeRef>
            <semantic:flowNodeRef>Step1011</semantic:flowNodeRef>
         </semantic:lane>
      </semantic:laneSet>
      <semantic:manualTask
         arost:uid="d66daa0f-b33a-454a-8dc9-f73d3670665e"
         completionQuantity="1" id="Step1005" isForCompensation="false"
         name="Bake the pizza" startQuantity="1">
         <semantic:incoming>Transition1012</semantic:incoming>
         <semantic:outgoing>Transition1013</semantic:outgoing>
      </semantic:manualTask>
      <semantic:manualTask
         arost:uid="15c50c15-1b47-4322-a9bb-2fd7078107fa"
         completionQuantity="1" id="Step1008" isForCompensation="false"
         name="Calm customer" startQuantity="1">
         <semantic:incoming>Transition1018</semantic:incoming>
         <semantic:outgoing>Transition1021</semantic:outgoing>
         <semantic:outgoing>Transition1019</semantic:outgoing>
      </semantic:manualTask>
      <semantic:manualTask
         arost:uid="c0f17713-c026-448c-8ac1-1cce794fad64"
         completionQuantity="1" id="Step1009" isForCompensation="false"
         name="Deliver the pizza" startQuantity="1">
         <semantic:incoming>Transition1013</semantic:incoming>
         <semantic:outgoing>Transition1017</semantic:outgoing>
         <semantic:outgoing>Transition1014</semantic:outgoing>
      </semantic:manualTask>
      <semantic:serviceTask
         arost:uid="1e341b84-c503-497e-a1d6-fe1b198e7308"
         completionQuantity="1" id="Step1010" isForCompensation="false"
         name="Receive payment" startQuantity="1">
         <semantic:incoming>Transition1016</semantic:incoming>
         <semantic:incoming>Transition1014</semantic:incoming>
         <semantic:outgoing>Transition1015</semantic:outgoing>
      </semantic:serviceTask>
      <semantic:parallelGateway
         arost:uid="79da9e3d-112e-4b54-9760-bd2f0a4d18ea" id="Step1004" name="">
         <semantic:incoming>Transition1010</semantic:incoming>
         <semantic:outgoing>Transition1012</semantic:outgoing>
         <semantic:outgoing>Transition1011</semantic:outgoing>
      </semantic:parallelGateway>
      <semantic:startEvent
         arost:uid="08c134c9-a228-4aa3-9e7f-9b0c476da024" id="Step1003"
         isInterrupting="true" name="Order received" parallelMultiple="false">
         <semantic:incoming>Transition1009</semantic:incoming>
         <semantic:outgoing>Transition1010</semantic:outgoing>
         <semantic:messageEventDefinition/>
      </semantic:startEvent>
      <semantic:endEvent
         arost:uid="f97d6143-bfd4-4569-ad8d-b3c872e8f5f9" id="Step1011" name="">
         <semantic:incoming>Transition1015</semantic:incoming>
         <semantic:terminateEventDefinition/>
      </semantic:endEvent>
      <semantic:intermediateCatchEvent
         arost:uid="6d99c880-7483-480d-8291-0f8a7616c302" id="Step1007"
         name="&quot;Where is my pizza?&quot;" parallelMultiple="false">
         <semantic:incoming>Transition1020</semantic:incoming>
         <semantic:incoming>Transition1019</semantic:incoming>
         <semantic:incoming>Transition1011</semantic:incoming>
         <semantic:outgoing>Transition1018</semantic:outgoing>
         <semantic:messageEventDefinition/>
      </semantic:intermediateCatchEvent>
      <semantic:sequenceFlow
         arost:uid="1e1458cc-ee03-46cc-9ad9-35e8381212cb"
         associationDirection="None" id="Transition1010" name=""
         sourceRef="Step1003" targetRef="Step1004"/>
      <semantic:sequenceFlow
         arost:uid="544c7fec-d2e9-456a-82ec-ba6a566d146b"
         associationDirection="None" id="Transition1011" name=""
         sourceRef="Step1004" targetRef="Step1007"/>
      <semantic:sequenceFlow
         arost:uid="102dc2be-2d88-4600-9d48-ed368da4c4bf"
         associationDirection="None" id="Transition1012" name=""
         sourceRef="Step1004" targetRef="Step1005"/>
      <semantic:sequenceFlow
         arost:uid="ef8ec7b5-a176-49f9-896c-d7492128e41b"
         associationDirection="None" id="Transition1013" name=""
         sourceRef="Step1005" targetRef="Step1009"/>
      <semantic:sequenceFlow
         arost:uid="2f474c54-7806-4f39-aeee-cc9424e6557a"
         associationDirection="None" id="Transition1014" name=""
         sourceRef="Step1009" targetRef="Step1010"/>
      <semantic:sequenceFlow
         arost:uid="0939a072-9203-4693-bb99-ce0b35317757"
         associationDirection="None" id="Transition1015" name=""
         sourceRef="Step1010" targetRef="Step1011"/>
      <semantic:sequenceFlow
         arost:uid="166aba67-da44-4a8f-b241-675a506c370e"
         associationDirection="None" id="Transition1018" name=""
         sourceRef="Step1007" targetRef="Step1008"/>
      <semantic:sequenceFlow
         arost:uid="75b16ca0-80ea-4e14-a3b2-c2f503731078"
         associationDirection="None" id="Transition1019" name=""
         sourceRef="Step1008" targetRef="Step1007"/>
   </semantic:process>
   <semantic:collaboration id="CollaborationPool1000">
      <semantic:participant id="Participant-Pool1000" name="" processRef="Pool1000"/>
      <semantic:participant id="Participant-Pool1001"
         name="Pizza customer" processRef="Pool1001"/>
      <semantic:participant id="Participant-Pool1002"
         name="Pizza vendor" processRef="Pool1002"/>
      <semantic:messageFlow
         arost:uid="d37a2acc-9ae7-4e0f-b330-e9adb8470652"
         associationDirection="None" id="Transition1009" name=""
         sourceRef="Step1001" targetRef="Step1003"/>
      <semantic:messageFlow
         arost:uid="540b45dc-7915-47bb-9e52-902efdc200ba"
         associationDirection="None" id="Transition1016" name=""
         sourceRef="Step1014" targetRef="Step1010"/>
      <semantic:messageFlow
         arost:uid="e7f57404-f3f2-4c43-aaf4-ebb9dd6c3f75"
         associationDirection="None" id="Transition1017" name=""
         sourceRef="Step1009" targetRef="Step1013"/>
      <semantic:messageFlow
         arost:uid="560ab001-0c89-4e56-b94a-9fbbcee23bf0"
         associationDirection="None" id="Transition1020" name=""
         sourceRef="Step1002" targetRef="Step1007"/>
      <semantic:messageFlow
         arost:uid="1edc05a3-bcf1-4dc3-9eae-6ba5d1f77fad"
         associationDirection="None" id="Transition1021" name=""
         sourceRef="Step1008" targetRef="Step1002"/>
   </semantic:collaboration>
   <bpmndi:BPMNDiagram documentation="" id="DiagramPool1000" name="" resolution="96.00">
      <bpmndi:BPMNPlane arost:style="2" bpmnElement="CollaborationPool1000">
         <bpmndi:BPMNShape bpmnElement="Participant-Pool1001"
            id="ShapePool1001" isHorizontal="true">
            <di:extension>
               <arost:containerdata color="#f0f0f0" labelcolor="#ff8000"/>
            </di:extension>
            <dc:Bounds height="231" width="1290" x="50" y="21"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Participant-Pool1002"
            id="ShapePool1002" isHorizontal="true">
            <di:extension>
               <arost:containerdata color="#f0f0f0" labelcolor="#ff8000"/>
            </di:extension>
            <dc:Bounds height="402" width="1296" x="50" y="287"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Lane1002">
            <di:extension>
               <arost:containerdata color="#f4ffdd" labelcolor="#beff39"/>
            </di:extension>
            <dc:Bounds height="153" width="1279" x="0" y="0"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Lane1000">
            <di:extension>
               <arost:containerdata color="#f4ffdd" labelcolor="#beff39"/>
            </di:extension>
            <dc:Bounds height="128" width="1279" x="0" y="153"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Lane1001">
            <di:extension>
               <arost:containerdata color="#f4ffdd" labelcolor="#beff39"/>
            </di:extension>
            <dc:Bounds height="121" width="1279" x="0" y="281"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1002" id="ShapeStep1002">
            <di:extension>
               <arost:stepdata color="#c8c8c8" icon="call-start.png"/>
            </di:extension>
            <dc:Bounds height="60" width="90" x="651" y="131"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1014" id="ShapeStep1014">
            <di:extension>
               <arost:stepdata color="#c8c8c8" icon="Money-icon.png"/>
            </di:extension>
            <dc:Bounds height="60" width="90" x="987" y="41"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1015" id="ShapeStep1015">
            <di:extension>
               <arost:stepdata color="#c8c8c8" icon="face-raspberry.png"/>
            </di:extension>
            <dc:Bounds height="60" width="90" x="1122" y="41"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1001" id="ShapeStep1001">
            <di:extension>
               <arost:stepdata color="#c8c8c8" icon="emblem-default.png"/>
            </di:extension>
            <dc:Bounds height="60" width="90" x="257" y="41"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1006" id="ShapeStep1006">
            <di:extension>
               <arost:stepdata color="#ff8000" decoration="" icon=""/>
            </di:extension>
            <dc:Bounds height="50" width="50" x="417" y="46"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1000" id="ShapeStep1000">
            <di:extension>
               <arost:stepdata color="#00ff00" icon=""/>
            </di:extension>
            <dc:Bounds height="50" width="50" x="93" y="46"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1016" id="ShapeStep1016">
            <di:extension>
               <arost:stepdata color="#ff0000" icon=""/>
            </di:extension>
            <dc:Bounds height="50" width="50" x="1263" y="46"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1012" id="ShapeStep1012">
            <di:extension>
               <arost:stepdata color="#ffff00" icon=""/>
            </di:extension>
            <dc:Bounds height="50" width="50" x="496" y="136"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1013" id="ShapeStep1013">
            <di:extension>
               <arost:stepdata color="#ffff00" icon=""/>
            </di:extension>
            <dc:Bounds height="50" width="50" x="818" y="46"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1005" id="ShapeStep1005">
            <di:extension>
               <arost:stepdata color="#c8c8c8" icon="fire_v2.png"/>
            </di:extension>
            <dc:Bounds height="60" width="90" x="473" y="475"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1008" id="ShapeStep1008">
            <di:extension>
               <arost:stepdata color="#ff0000" icon="user-new-3.png"/>
            </di:extension>
            <dc:Bounds height="60" width="90" x="651" y="324"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1009" id="ShapeStep1009">
            <di:extension>
               <arost:stepdata color="#c8c8c8" icon="emblem-shared.png"/>
            </di:extension>
            <dc:Bounds height="60" width="90" x="798" y="600"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1010" id="ShapeStep1010">
            <di:extension>
               <arost:stepdata color="#00ff00" icon="Dollar-icon.png"/>
            </di:extension>
            <dc:Bounds height="60" width="90" x="987" y="600"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1004" id="ShapeStep1004">
            <di:extension>
               <arost:stepdata color="#ff8000" decoration="" icon=""/>
            </di:extension>
            <dc:Bounds height="50" width="50" x="307" y="329"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1003" id="ShapeStep1003">
            <di:extension>
               <arost:stepdata color="#00ff00" icon=""/>
            </di:extension>
            <dc:Bounds height="50" width="50" x="203" y="329"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1011" id="ShapeStep1011">
            <di:extension>
               <arost:stepdata color="#ff0000" icon=""/>
            </di:extension>
            <dc:Bounds height="50" width="50" x="1263" y="605"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="Step1007" id="ShapeStep1007">
            <di:extension>
               <arost:stepdata color="#ffff00" icon=""/>
            </di:extension>
            <dc:Bounds height="50" width="50" x="507" y="329"/>
            <bpmndi:BPMNLabel/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNEdge bpmnElement="Transition1000" id="EdgeTransition1000">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="143" y="71"/>
            <di:waypoint x="200" y="71"/>
            <di:waypoint x="200" y="71"/>
            <di:waypoint x="257" y="71"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1001" id="EdgeTransition1001">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="347" y="71"/>
            <di:waypoint x="382" y="71"/>
            <di:waypoint x="382" y="71"/>
            <di:waypoint x="417" y="71"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1002" id="EdgeTransition1002">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="467" y="71"/>
            <di:waypoint x="642" y="71"/>
            <di:waypoint x="642" y="71"/>
            <di:waypoint x="818" y="71"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1003" id="EdgeTransition1003">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest4Style">
                  <arost:bendpoint index="0" x="768" y="176"/>
                  <arost:bendpoint index="1" x="768" y="230"/>
                  <arost:bendpoint index="2" x="384" y="230"/>
                  <arost:bendpoint index="3" x="384" y="71"/>
               </arost:styledata>
            </di:extension>
            <di:waypoint x="741" y="161"/>
            <di:waypoint x="768" y="161"/>
            <di:waypoint x="768" y="230"/>
            <di:waypoint x="384" y="230"/>
            <di:waypoint x="384" y="71"/>
            <di:waypoint x="417" y="71"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1004" id="EdgeTransition1004">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="868" y="71"/>
            <di:waypoint x="927" y="71"/>
            <di:waypoint x="927" y="71"/>
            <di:waypoint x="987" y="71"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1005" id="EdgeTransition1005">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="1077" y="71"/>
            <di:waypoint x="1099" y="71"/>
            <di:waypoint x="1099" y="71"/>
            <di:waypoint x="1122" y="71"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1006" id="EdgeTransition1006">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="1212" y="71"/>
            <di:waypoint x="1237" y="71"/>
            <di:waypoint x="1237" y="71"/>
            <di:waypoint x="1263" y="71"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1007" id="EdgeTransition1007">
            <di:extension>
               <arost:docking source="SOUTH" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.SouthWest1Style"/>
            </di:extension>
            <di:waypoint x="442" y="96"/>
            <di:waypoint x="442" y="161"/>
            <di:waypoint x="496" y="161"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1008" id="EdgeTransition1008">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="546" y="161"/>
            <di:waypoint x="598" y="161"/>
            <di:waypoint x="598" y="161"/>
            <di:waypoint x="651" y="161"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1010" id="EdgeTransition1010">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="253" y="354"/>
            <di:waypoint x="280" y="354"/>
            <di:waypoint x="280" y="354"/>
            <di:waypoint x="307" y="354"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1011" id="EdgeTransition1011">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="357" y="354"/>
            <di:waypoint x="432" y="354"/>
            <di:waypoint x="432" y="354"/>
            <di:waypoint x="507" y="354"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1012" id="EdgeTransition1012">
            <di:extension>
               <arost:docking source="SOUTH" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.SouthWest1Style"/>
            </di:extension>
            <di:waypoint x="332" y="379"/>
            <di:waypoint x="332" y="505"/>
            <di:waypoint x="473" y="505"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1013" id="EdgeTransition1013">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="563" y="505"/>
            <di:waypoint x="680" y="505"/>
            <di:waypoint x="680" y="630"/>
            <di:waypoint x="798" y="630"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1014" id="EdgeTransition1014">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="888" y="630"/>
            <di:waypoint x="937" y="630"/>
            <di:waypoint x="937" y="630"/>
            <di:waypoint x="987" y="630"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1015" id="EdgeTransition1015">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="1077" y="630"/>
            <di:waypoint x="1170" y="630"/>
            <di:waypoint x="1170" y="630"/>
            <di:waypoint x="1263" y="630"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1018" id="EdgeTransition1018">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest2Style"/>
            </di:extension>
            <di:waypoint x="557" y="354"/>
            <di:waypoint x="604" y="354"/>
            <di:waypoint x="604" y="354"/>
            <di:waypoint x="651" y="354"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1019" id="EdgeTransition1019">
            <di:extension>
               <arost:docking source="EAST" target="WEST"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.EastWest4Style">
                  <arost:bendpoint index="0" x="788" y="366"/>
                  <arost:bendpoint index="1" x="788" y="427"/>
                  <arost:bendpoint index="2" x="449" y="427"/>
                  <arost:bendpoint index="3" x="449" y="354"/>
               </arost:styledata>
            </di:extension>
            <di:waypoint x="741" y="354"/>
            <di:waypoint x="788" y="354"/>
            <di:waypoint x="788" y="427"/>
            <di:waypoint x="449" y="427"/>
            <di:waypoint x="449" y="354"/>
            <di:waypoint x="507" y="354"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1009" id="EdgeTransition1009">
            <di:extension>
               <arost:docking source="SOUTH" target="NORTH"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.SouthNorth2Style"/>
            </di:extension>
            <di:waypoint x="302" y="101"/>
            <di:waypoint x="302" y="215"/>
            <di:waypoint x="228" y="215"/>
            <di:waypoint x="228" y="329"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1016" id="EdgeTransition1016">
            <di:extension>
               <arost:docking source="SOUTH" target="NORTH"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.SouthNorth2Style"/>
            </di:extension>
            <di:waypoint x="1032" y="101"/>
            <di:waypoint x="1032" y="350"/>
            <di:waypoint x="1032" y="350"/>
            <di:waypoint x="1032" y="600"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1017" id="EdgeTransition1017">
            <di:extension>
               <arost:docking source="NORTH" target="SOUTH"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.NorthSouth2Style"/>
            </di:extension>
            <di:waypoint x="843" y="600"/>
            <di:waypoint x="843" y="348"/>
            <di:waypoint x="843" y="348"/>
            <di:waypoint x="843" y="96"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1020" id="EdgeTransition1020">
            <di:extension>
               <arost:docking source="SOUTH" target="NORTH"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.SouthNorth2Style">
                  <arost:bendpoint index="0" x="696" y="273"/>
                  <arost:bendpoint index="1" x="532" y="273"/>
               </arost:styledata>
            </di:extension>
            <di:waypoint x="696" y="191"/>
            <di:waypoint x="696" y="273"/>
            <di:waypoint x="532" y="273"/>
            <di:waypoint x="532" y="329"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge bpmnElement="Transition1021" id="EdgeTransition1021">
            <di:extension>
               <arost:docking source="NORTH" target="SOUTH"/>
               <arost:styledata name="com.arost.bpmn.diagram.transition.NorthSouth2Style"/>
            </di:extension>
            <di:waypoint x="696" y="324"/>
            <di:waypoint x="696" y="257"/>
            <di:waypoint x="696" y="257"/>
            <di:waypoint x="696" y="191"/>
         </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
   </bpmndi:BPMNDiagram>
</semantic:definitions>
</bpmnio>
```
