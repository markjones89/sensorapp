<template>
    <div class="building-svg">
        <svg width="355" :height="buildingHeight" :viewBox="`0 0 355 ${buildingHeight}`" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g class="rooftop">
                <path d="M341.559 134.27L243.971 190.677V223.899L341.559 167.492V134.27Z" fill="#485B66"/>
                <path d="M12.457 89.6288L243.969 223.899V190.677L12.457 56.0613V89.6288Z" fill="#65737B"/>
                <path d="M354.709 163.339L243.971 227.359V232.204L354.709 168.184V163.339Z" fill="#5F7C8C"/>
                <path d="M0 90.6669L243.97 232.204V227.359L0 85.8221V90.6669Z" fill="#5F7C8C"/>
                <path d="M12.4581 78.5549L0 85.8221L243.97 227.359L354.709 163.339L341.558 155.726V161.609L243.97 218.362L12.4581 84.0918V78.5549Z" fill="#839BA9"/>
                <path d="M12.457 56.0612L243.969 190.677L341.557 134.27L110.391 0L12.457 56.0612Z" fill="#597281"/>
                <path d="M331.178 137.039L335.331 134.616L110.394 3.80664L19.3809 56.0613L23.5335 58.4837L110.394 8.65144L331.178 137.039Z" fill="#668196"/>
                <path d="M331.174 137.039L110.39 8.65137L23.5293 58.4836L244.314 187.217L331.174 137.039Z" fill="#889BAA"/>
                <path d="M236.703 116.275L200.713 137.039L254.698 168.53L290.688 148.112L236.703 116.275Z" fill="#668196"/>
                <path d="M286.881 147.42L254.697 166.107V137.039L286.881 118.352V147.42Z" fill="#485B66"/>
                <path d="M204.52 137.039L254.698 166.107V137.039L204.52 107.97V137.039Z" fill="#65737B"/>
                <path d="M209.02 114.199V139.461L219.747 146.036V120.774L209.02 114.199Z" fill="#485B66"/>
                <path d="M219.054 121.12L209.711 115.583V139.807L219.054 145.344V121.12Z" fill="#839BA9"/>
                <path d="M236.703 89.2827L204.52 107.97L254.698 137.039L286.881 118.352L236.703 89.2827Z" fill="#597281"/>
                <path d="M105.2 33.5676L132.192 49.4863L91.3577 73.3642L64.3652 57.7916L105.2 33.5676Z" fill="#668196"/>
                <path d="M67.4805 57.0994L91.3584 70.9417V59.5219L67.4805 45.6796V57.0994Z" fill="#65737B"/>
                <path d="M128.393 49.4862L91.3652 70.9417V59.5218L128.393 38.0663V49.4862Z" fill="#485B66"/>
                <path d="M104.509 24.224L128.387 38.0663L91.3584 59.5218L67.4805 45.6795L104.509 24.224Z" fill="#597281"/>
                <path d="M70.9414 45.3335L88.5903 55.7152V51.9086L70.9414 41.8729V45.3335Z" fill="#65737B"/>
                <path d="M122.159 35.99L88.5918 55.7152V51.9086L122.159 32.5294V35.99Z" fill="#485B66"/>
                <path d="M104.855 22.1477L122.158 32.5294L88.5903 51.9086L70.9414 41.873L104.855 22.1477Z" fill="#597281"/>
            </g>
            <g class="floor" v-for="(f, i) in floors" :key="f.id" :style="{ transform: `translateY(${i * floorHeight}px)` }" :floor="f.number"
                :class="getLiveColor(f.occupancy_live, f.occupancy_limit)" :data-hover="clickableFloor" @click="clickableFloor && floorClick(f)">
                <path d="M341.559 175L243.971 231.5V267.5L341.559 211.5V175Z" fill="#FF8600"/>
                <path d="M12.457 133L243.969 267.5V231.5L12.457 96.5V133Z" fill="#FF8600"/>
                <g class="floor-base">
                    <path d="M354.709 212.46L243.971 276.481V280.98L354.709 216.959V212.46Z" fill="#5F7C8C"/>
                    <path d="M0 139.442L243.97 280.979V276.481L0 134.943V139.442Z" fill="#5F7C8C"/>
                    <path d="M12.4581 127.676L0 134.943L243.97 276.481L354.709 212.46L341.558 204.501V210.73L243.97 267.137L12.4581 132.867V127.676Z" fill="#839BA9"/>
                </g>
            </g>
        </svg>
    </div>
</template>
<style lang="scss">
$green: #01FE01;//#3DCFA3;
$yellow: #FF8600;//#F0A718;
$orange: #ED0003;//#FF5A09;
$darkenAmount: 10%;

.building-svg {
    svg { pointer-events: initial; }
}

.floor {
    path {
        transition: fill .24s;
    }

    &.green > path {
        fill: $green;
    }
    &.yellow > path {
        fill: $yellow;
    }
    &.orange > path {
        fill: $orange;
    }
    
    &[data-hover="true"] {
        cursor: pointer;

        &.green:hover > path {
            fill: darken($color: $green, $amount: $darkenAmount);
        }
        &.yellow:hover > path {
            fill: darken($color: $yellow, $amount: $darkenAmount);
        }
        &.orange:hover > path {
            fill: darken($color: $orange, $amount: $darkenAmount);
        }
    }
}
</style>
<script>
export default {
    props: ['floors', 'clickableFloor'],
    data() {
        return {
            floorHeight: 48, roofHeight: 234
        }
    },
    computed: {
        floorCount() { return this.floors.length },
        buildingHeight() { return (this.floorCount * this.floorHeight) + this.roofHeight }
    },
    methods: {
        getLiveColor(live, limit){
            let percent = (live / limit) * 100

            return {
                green: percent < 50,
                yellow: percent >= 50,
                orange: percent >= 90
            }
        },
        floorClick(floor) {
            this.$emit('floorClick', floor)
        }
    }
}
</script>