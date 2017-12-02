function LightBall(boxObject, scale)
{
    this.box = boxObject;
    this.scaling = scale;
    this.drawObject = drawLightObject;
}

function drawLightObject()
{
    pos = this.box.GetPosition();
    m_radius = this.box.GetFixtureList().GetShape().m_radius;

    var lightRadius = window.innerHeight;//20 * m_radius * this.scaling;
    var actualRadius = m_radius * this.scaling;
    var xPos = pos.x * this.scaling;
    var yPos = pos.y * this.scaling;
    
    // draw light
    context2.beginPath();
    context2.moveTo(xPos, yPos);
    context2.arc(xPos, yPos, lightRadius, 0, 2 * Math.PI, false);
    
    context2.fillStyle = '#fff';
    context2.fill();
    context2.closePath();

    context2.beginPath();
    for(var o in otherObjects)
    {
        var oPos = otherObjects[o].box.GetPosition();
        var xPosO = oPos.x * this.scaling;
        var yPosO = oPos.y * this.scaling;
        var oRad = otherObjects[o].box.GetFixtureList().GetShape().m_radius * this.scaling;
        var a = xPosO - xPos;
        var b = yPosO - yPos;
        var distance = Math.sqrt((a*a)+(b*b));
        if(distance < (lightRadius + oRad))
        {   
            var startPoint = Math.atan(b/a) + (Math.PI / 2);
            // context2.moveTo(xPosO, yPosO);
            // if(a <= 0)   
            // {
            //     context2.arc(xPosO, yPosO, oRad, startPoint, startPoint + Math.PI, true);
            // }
            // else
            // {
            //     context2.arc(xPosO, yPosO, oRad, startPoint - Math.PI, startPoint, true);
            // }
            var offset = (Math.PI / 8) * (1 - ((distance - oRad) / (lightRadius - actualRadius)));//((2 * Math.PI)/ 360);(Math.PI / 2) * (1-Math.sqrt(distance / lightRadius))
            if(a > 0)
            {
                offset = -offset;
            }
            var point1x = xPosO + (oRad * Math.cos(startPoint - offset));
            var point1y = yPosO + (oRad * Math.sin(startPoint - offset));
            var point2x = xPosO + (oRad * Math.cos(startPoint + Math.PI + offset));
            var point2y = yPosO + (oRad * Math.sin(startPoint + Math.PI + offset));
            // now go from point x to point y
            var angle1 = Math.atan((point1y-yPos)/(point1x-xPos));
            var angle2 = Math.atan((point2y-yPos)/(point2x-xPos));
            if(point1x-xPos > 0)
            {
                var point3x = point1x + (2 * lightRadius * Math.cos(angle1))
                var point3y = point1y + (2 * lightRadius * Math.sin(angle1))
            }
            else
            {
                var point3x = point1x - (2 * lightRadius * Math.cos(angle1))
                var point3y = point1y - (2 * lightRadius * Math.sin(angle1))
            }
            if(point2x-xPos > 0)
            {
                var point4x = point2x + (2 * lightRadius * Math.cos(angle2))
                var point4y = point2y + (2 * lightRadius * Math.sin(angle2))
            }
            else
            {
                var point4x = point2x - (2 * lightRadius * Math.cos(angle2))
                var point4y = point2y - (2 * lightRadius * Math.sin(angle2))
            }
            
            if(a <= 0)
            {
                context2.moveTo(point4x, point4y);
                context2.lineTo(point3x, point3y);
                context2.lineTo(point1x, point1y);
                context2.lineTo(point2x, point2y);
                context2.lineTo(point4x, point4y);
            }
            else
            {
                context2.moveTo(point3x, point3y);
                context2.lineTo(point4x, point4y);
                context2.lineTo(point2x, point2y);
                context2.lineTo(point1x, point1y);
                context2.lineTo(point3x, point3y);
            }
        }
    }
    context2.fillStyle = 'rgb(179, 178, 178)';
    context2.fill();
    context2.closePath();

    // draw center ball
    context2.beginPath();
    context2.arc(xPos, yPos, m_radius * this.scaling, 0, 2 * Math.PI, false);
    context2.fillStyle = '#fff';
    context2.fill();
    context2.lineWidth = 1;
    context2.strokeStyle = '#003300';
    context2.stroke();
    context2.closePath();
}